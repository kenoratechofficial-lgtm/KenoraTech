# KenoraTech Protected Demo Integration

Each Vercel or Render demo must enforce access on its own server. Never expose `KENORA_DEMO_CLIENT_SECRET` to browser code.

## Environment variables

```text
KENORA_DEMO_API_URL=https://kenoratech.com
KENORA_DEMO_CLIENT_ID=issued-by-kenoratech-admin
KENORA_DEMO_CLIENT_SECRET=shown-once-in-admin
KENORA_DEMO_PROJECT_ID=mongodb-project-id
```

## Server validation

When a visitor first opens `/?access_token=...`, the demo server sends:

```http
POST https://kenoratech.com/api/demo-access/validate
Content-Type: application/json

{ "token": "...", "projectId": "...", "clientId": "...", "clientSecret": "..." }
```

If `allowed` is true, create an HTTP-only, Secure, SameSite=Lax session cookie in the demo app and redirect to `/` to remove the token from the URL. Revalidate the local session against KenoraTech on each protected server request (or a short interval) so revocation and expiry take effect.

Never trust localStorage, client-side route guards, or a hidden deployment URL. When denied, show an access-required, expired, or revoked screen and link visitors back to the relevant KenoraTech portfolio request page.
