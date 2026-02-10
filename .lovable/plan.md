Admin Visual Homepage Editor — Final Plan (Start-to-Finish, Single Truth, Staged Publishing)

0. Objective Build one admin page that mirrors the live homepage exactly and lets an admin click any image to edit it. All edits are staged locally. Nothing goes live until Approve. Approve overwrites the same storage key in Supabase Storage (upsert), so the live homepage updates instantly. Any cloned website also updates only if it reads from the same Supabase project, same bucket, and same storage paths.


1. Definitions 1.1 Live homepage The client-facing homepage currently renders images using cdnUrl(storagePath) pointing to Supabase Storage.



1.2 Cloned website Any other deployed copy/fork of the same site code. It updates automatically only if it uses the same Supabase project, same bucket, and the exact same storage paths (keys). If it uses local /public images, external URLs, or another bucket/project, it will not update and is not allowed.

2. Non-Negotiable Rule: Single Source of Truth From now on, all homepage images must come from one Supabase Storage bucket and be rendered only via: img src = cdnUrl(storagePath)



Disallowed for homepage images:

/public images

imported local assets

external URLs

secondary buckets/projects

any fallback logic that chooses from multiple sources


3. Publishing Model 3.1 Staging Edits happen locally first:



Upload → preview in place

AI Edit/Regenerate → preview in place No storage overwrite occurs during staging.


3.2 Approve When the admin clicks Approve for a specific image:

Upload the new image to Supabase Storage using upsert=true

Overwrite the exact same storagePath (same key/filename)

Set cacheControl to allow immediate revalidation

Refresh the selected image in the admin mirror instantly by appending ?t=Date.now()


3.3 Result Because the live homepage uses the same storagePath, it updates immediately. Any compliant clone updates too.

4. Critical Requirement: AI Must Not Publish Before Approve The existing generate-site-image edge function currently uploads to storage. That violates staging if it writes to the final storagePath before Approve.



Implement one approach fully:

Approach A (preferred): Preview Mode

Update generate-site-image to accept publish=false

When publish=false: return the generated image as base64 (or data URL) and do not upload

Approve is the only step that uploads/upserts to the final storagePath


Approach B: Staging Path Upload

AI generation uploads only to staging/homepage-editor/<uuid>.webp

Preview uses the staging URL

Approve copies the staged result into the final storagePath using upsert

Discard deletes the staged file


If you do not implement A or B, the “Approve” button becomes meaningless.

5. Cache Requirements (So “instant” is real) Overwriting the same key can appear “not instant” if caching is long.



On every final upload/upsert for homepage assets:

cacheControl must be: max-age=0, must-revalidate


In the admin editor only (after approve):

set img.src = cdnUrl(storagePath) + "?t=" + Date.now() This guarantees the admin sees the new version immediately.


6. Consolidation Step: Eliminate Other Image Sources Create a canonical registry of homepage image paths:



File: src/lib/imageRegistry.ts Exports stable storage paths, for example:

HOMEPAGE_HERO: "homepage/hero.webp"

HOMEPAGE_GIFT: "homepage/gift.webp" (and all other homepage images)


Refactor the live homepage components so every image uses only: cdnUrl(IMAGES.HOMEPAGE_HERO) No imports, no /public, no external, no fallbacks.

This ensures the admin mirror and the live homepage render the exact same components and the exact same storage keys.

7. Admin Editor: Files to Create 7.1 src/pages/admin/HomepageEditor.tsx Responsibilities:



Route: /admin/homepage-editor

Wrap the mirrored homepage in a global editor provider/store (Zustand preferred)

Render the same homepage components as the live site (Hero, galleries, sections, etc.)

Disable homepage interactions that distract editing without changing layout: Use CSS pointer-events: none on non-editor interactive layers (cart, WhatsApp float, modals triggers), but keep layout identical

Wrap the mirrored homepage in ImageEditOverlay


7.2 src/components/admin/ImageEditOverlay.tsx Responsibilities:

Make any img inside the mirrored homepage clickable

Use event delegation (single handler on the container) for reliability with React rerenders

Hover effect: orange dashed outline + pointer cursor on images

On click:

identify the clicked img via closest("img")

extract the canonical storagePath from its src (only if it matches cdnUrl format)

if parsing fails (external/local), ignore and treat as not editable

open ImageEditorToolkit anchored to that image



Editable Image Rule: Editable only if src was produced by cdnUrl and can be parsed back into a storagePath within the allowed bucket/prefix.

7.3 src/components/admin/ImageEditorToolkit.tsx Floating toolkit anchored near the selected image:

Upload

file picker

create preview (Object URL or data URL)

stage locally (do not upload yet)


AI Edit

prompt input

send current image as base64 + prompt to generate-site-image in preview mode (or staging path)

stage locally


AI Regenerate

one-click preset prompt

same staging rule


Preview behavior

replace the clicked img visually in the mirror using the staged preview


Approve

upload/upsert final to the canonical storagePath

set cacheControl: max-age=0, must-revalidate

refresh the clicked img src locally with ?t=Date.now()

clear pending state for that image


Discard/Cancel

revert to original

clear pending state



Additionally: For any image with a pending staged edit, render an inline badge near that image:

Approve

Discard This supports staging multiple images and approving them one by one.


7.4 src/hooks/useImageEditor.ts (Zustand) State keyed by storagePath, not URL:

activePath: string | null

activeImgEl: HTMLImageElement | null (for anchoring and direct refresh)

pendingEdits: Record<storagePath, { originalUrl, previewUrlOrDataUrl, blobOrBase64 }>


Actions:

setActive(storagePath, imgEl)

stageEdit(storagePath, previewData)

discard(storagePath)

approve(storagePath) → uploads/upserts then clears pending


8. Route Registration In App.tsx: <Route path="/admin/homepage-editor" element={<AdminLayout><HomepageEditor /></AdminLayout>} />


9. Upload Methods Manual upload:



Use Supabase Storage SDK upload OR manage-images edge function

Must use upsert=true

Must set cacheControl="max-age=0, must-revalidate"

Must write to the exact canonical storagePath (no new filenames)


AI edit/regenerate:

Must follow the staging requirement (Approach A or B)

Must not overwrite final storagePath before Approve


10. Security (Server-Side Enforcement) AdminLayout UI is not security.



Implement:

Supabase Storage policies: only admins can upsert/update under homepage/ (and other allowed prefixes if needed)

Edge functions: verify admin JWT/claims before generating or uploading

Restrict allowed upload prefixes (homepage/, products/, global/)

Never allow arbitrary filename writes


Deliverable expectation Implement the above exactly. No shortcuts. The result must be:

One truth: Supabase Storage keys

Admin edits are staged locally

Only Approve publishes by overwriting the same storagePath

Live homepage updates immediately

Any compliant cloned site updates automatically because it reads the same bucket + keys