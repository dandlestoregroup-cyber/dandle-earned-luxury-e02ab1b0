
# Cloud Image Manager

Build a full image management admin page and an API endpoint for external tools.

## Part 1: Admin Image Manager Page

Replace the current upload-only page at `/admin/upload-images` with a full image manager that lets you:

- **Browse**: Grid of thumbnail previews for all images in cloud storage, grouped by product
- **Search/Filter**: Type to filter by filename
- **Upload new**: Drag-and-drop or file picker to upload one or more new images
- **Replace**: Click an existing image to replace it with a new file (keeps the same filename/path)
- **Delete**: Remove images you no longer need
- **Copy URL**: One-click copy of the CDN URL for any image
- **Preview**: Click to see full-size in a lightbox

The page will read directly from the `product-images` storage bucket and display everything found there.

## Part 2: Image Upload API (for Manus and other AI agents)

Create a new backend function `manage-images` that accepts REST-style requests:

| Method | Action | Body |
|--------|--------|------|
| GET | List all images | (none) |
| POST | Upload/replace image | `{ filename, base64, contentType }` |
| DELETE | Delete image | `{ filename }` |

This gives any external tool (Manus, scripts, Zapier, etc.) a simple API to manage images without needing the web UI. The endpoint URL would be:
`https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images`

## Technical Details

### New/Modified Files

| File | What |
|------|------|
| `supabase/functions/manage-images/index.ts` | New REST API for list/upload/delete |
| `src/pages/admin/UploadImages.tsx` | Rewrite as full image manager with grid, upload, replace, delete |
| `supabase/config.toml` | Add `manage-images` function config |

### Admin Image Manager UI (`UploadImages.tsx`)

- Fetches all files from `product-images` bucket via Supabase Storage JS client
- Displays as a responsive thumbnail grid (lazy loaded)
- Each image card shows: thumbnail, filename, file size, copy-URL button, replace button, delete button
- Top bar: search input, "Upload New" button (opens file picker for multi-file upload)
- Upload uses the existing `upload-images` edge function for new files, or direct Supabase storage `upload()` with `upsert: true` for replacements
- Delete uses Supabase storage `remove()`
- Confirmation dialog before delete

### Manage Images API (`manage-images/index.ts`)

- `GET` -- lists all objects in `product-images/images/` with their public URLs
- `POST` -- accepts `{ filename, base64, contentType }`, decodes base64, uploads to `product-images/images/{filename}` with `upsert: true`
- `DELETE` -- accepts `{ filename }`, removes from bucket
- Uses service role key for storage access
- `verify_jwt = false` in config so external tools can call it (images are already public)
- Returns JSON responses with success/error status

### Example API Usage (for Manus)

```
POST /functions/v1/manage-images
Content-Type: application/json

{
  "filename": "relaxmax-new-angle.webp",
  "base64": "/9j/4AAQSkZJRg...",
  "contentType": "image/webp"
}
```

```
DELETE /functions/v1/manage-images
Content-Type: application/json

{ "filename": "old-unused-image.webp" }
```

```
GET /functions/v1/manage-images
--> returns list of all images with CDN URLs
```

### Execution Order

1. Create `manage-images` edge function and add to config.toml
2. Rebuild `UploadImages.tsx` as full image manager
3. Keep existing bulk migration functionality as a tab/section within the new page
