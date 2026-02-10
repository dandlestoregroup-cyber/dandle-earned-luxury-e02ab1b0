

# Fix: Toolkit Disappearing + Uploaded Image Not Showing on Mirror

## Problems Identified

1. **Toolkit vanishes after upload**: When a file is uploaded, `stageEdit()` updates the Zustand store. The `pendingEdits` useEffect in `ImageEditOverlay` fires and changes `img.src` to a data URL. This causes the toolkit to lose its reference because `extractStoragePath()` can't parse data URLs back to a storage path.

2. **Uploaded image not visible on the mirrored page**: The preview-application effect scans all images and tries to match them by parsing `img.src`. After the first staging, `img.src` is already a data URL. The code checks `data-original-src` but the matching logic has a race condition -- the original src attribute isn't always set before the data URL replaces it.

## Root Cause

Both bugs share one root cause: `data-original-src` handling is fragile. The effect that applies previews (lines 86-104) saves the original src only if `data-original-src` is not yet set, but it reads `img.getAttribute("data-original-src") || img.src` -- after the first staging, `img.src` is a data URL, and on subsequent effect runs it may try to re-save the data URL as the "original."

## Fix Plan

### Change 1: `ImageEditOverlay.tsx` -- Robust original-src preservation and preview application

- On mount (and when children change), immediately scan all images and stamp `data-original-src` with their CDN URL **before** any pending edits are applied. Use a `MutationObserver` to catch newly-rendered images and stamp them too.
- Separate the "save originals" step from the "apply previews" step to prevent race conditions.
- When applying previews, always read from `data-original-src` (never from current `img.src`).

### Change 2: `ImageEditorToolkit.tsx` -- Keep toolkit open after staging

- After `stageEdit()` is called (upload, AI edit, AI regen), do NOT close the toolkit. The toolkit should remain open showing the Approve/Discard buttons.
- Add `e.stopPropagation()` to the toolkit's container so clicks inside it don't trigger the overlay's click handler (already present, but verify).
- The toolkit must keep its position stable by referencing the stored `activeImgEl` which doesn't change -- only its `src` changes.

### Change 3: `ImageEditOverlay.tsx` -- Preview application must update the `img.src` in-place

- After staging, the effect must find the image by its `data-original-src` attribute (not current `src`) and set `img.src = edit.previewDataUrl`.
- This ensures the uploaded/generated image is visually shown on the mirrored page immediately.

### Change 4: `ImageEditorToolkit.tsx` -- Show a thumbnail preview of the staged image

- Inside the toolkit, when there's a pending edit for the active path, show a small preview thumbnail of the new image so the admin knows exactly what they're approving.

## Technical Details

### `ImageEditOverlay.tsx` changes:

```text
1. Add a useEffect that runs once + MutationObserver to stamp data-original-src 
   on every img whose src matches cdnUrl pattern, BEFORE pending edits are applied.

2. In the pendingEdits useEffect, always use:
   const origSrc = img.getAttribute("data-original-src");
   if (!origSrc) return; // skip unstamped images
   const path = extractStoragePath(origSrc);
   // Never read img.src for path matching after staging

3. Also restore images that no longer have pending edits:
   if (!edit && img.src !== origSrc) img.src = origSrc;
```

### `ImageEditorToolkit.tsx` changes:

```text
1. After handleFileUpload calls stageEdit(), do NOT call setActive(null, null).
   The toolkit stays open with Approve/Discard visible.

2. Add a preview section: when hasPending is true, show a 120px thumbnail 
   of pendingEdits[activePath].previewDataUrl above the Approve/Discard buttons.
   This gives the admin visual confirmation of what they're approving.
```

### Files Modified

| File | Change |
|---|---|
| `src/components/admin/ImageEditOverlay.tsx` | Robust data-original-src stamping via MutationObserver; fix preview application to always match by original src; restore originals when edits are discarded |
| `src/components/admin/ImageEditorToolkit.tsx` | Add staged image thumbnail preview; ensure toolkit stays open after staging |

