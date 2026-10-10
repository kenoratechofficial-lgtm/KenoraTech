# Deployment Notes

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user in **Database Access**.
3. In **Network Access**, add `0.0.0.0/0` for Vercel/Render deployments.
4. Copy the **Drivers** connection string. It must start with `mongodb+srv://`.
5. Replace username and password in the URI.
6. If your password contains special characters like `@`, `#`, `?`, `/`, `:` or spaces, URL-encode the password before putting it in `MONGODB_URI`.

Example:

```env
MONGODB_URI=mongodb+srv://username:encoded-password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=kenora-tech
ADMIN_TOKEN=use-a-long-random-secret
```

## Vercel

Set these in **Project Settings > Environment Variables**:

- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_TOKEN`

Then redeploy the project. The portfolio admin is available at `/admin`.

## Render

Use:

- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Node version: `>=20.19.0`

Set the same environment variables:

- `MONGODB_URI`
- `MONGODB_DB`
- `ADMIN_TOKEN`

## Troubleshooting

If the contact form or admin page shows a MongoDB connection error:

- Check Atlas **Network Access** includes `0.0.0.0/0`.
- Check `MONGODB_URI` starts with `mongodb+srv://`.
- Check the database username and password are correct.
- URL-encode special characters in the password.
- Redeploy after changing environment variables.
