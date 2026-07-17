# Deployment

## Vercel

The repository is designed for Vercel's static deployment path.

1. Import the GitHub repository or run `vercel --prod` from the repository root.
2. Use Node.js 22 and the default `npm run build` command.
3. Set `NEXT_PUBLIC_SITE_URL` only if the final canonical hostname differs from `https://jashwanth-portfolio-ten.vercel.app`.
4. Verify headers, all routes, external project media, sitemap, and social previews after deployment.

No server secrets are required. Automatic production deployment should use a protected `main` branch and green CI. Rollback is a Vercel deployment promotion or a normal revert commit; do not rewrite Git history.
