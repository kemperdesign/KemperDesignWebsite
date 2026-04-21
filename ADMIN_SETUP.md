# Blog Admin System Setup Guide

The blog admin system is now implemented and ready to deploy. Here's what's been set up:

## ✅ What's Complete

- **API Endpoints**: Login, posts CRUD, and image upload (all in `api/` folder)
- **Admin Panel**: `/admin.html` with full UI for creating, editing, and deleting blog posts
- **Blog Page**: `/blog.html` now dynamically fetches and displays posts
- **Database**: Blog posts are stored as committed HTML files in `site/posts/` via GitHub
- **Directories Created**: `site/data/`, `site/posts/`, `site/assets/images/blog/`
- **Dependencies**: `@octokit/rest` and `jsonwebtoken` installed

## 🚀 Next Steps

### 1. Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings and add these environment variables:

- **ADMIN_PASSWORD**: Your desired admin login password (or leave blank to use default: `KemperAdmin2026`)
- **GITHUB_TOKEN**: Personal Access Token with `repo` scope ([Create one here](https://github.com/settings/tokens))
- **GITHUB_OWNER**: Your GitHub username or organization
- **GITHUB_REPO**: Repository name (e.g., `kemper-design`)
- **JWT_SECRET**: Any random string (e.g., `your-random-secret-key-here`)

### 2. Test Locally (Optional)

```bash
# From the project root
npm install
vercel dev
```

Then visit `http://localhost:3000/admin.html` and login with the password to test.

### 3. Deploy

Push your changes to GitHub:

```bash
git add .
git commit -m "Add blog admin system with Vercel + GitHub integration"
git push origin main
```

Vercel will automatically redeploy.

## 📋 How to Use

1. **Visit Admin Panel**: Go to `yoursite.com/admin.html`
2. **Login**: Use your admin password
3. **Create Post**:
   - Click "New Post"
   - Fill in Title, Category, Content, etc.
   - Upload a featured image (auto-resized if > 1200px)
   - Click "Save Post"
4. **Edit/Delete**: Use the posts table to edit or delete existing posts
5. **See Live**: Posts appear on `/blog` page in ~30 seconds

## 🔒 Security Notes

- The default fallback password (`KemperAdmin2026`) is visible in code — set `ADMIN_PASSWORD` env var to override it
- JWT tokens expire after 24 hours (user must login again)
- All API calls are authenticated except GET `/api/posts` (needed for blog page)

## 🐛 Troubleshooting

**Posts not appearing on blog page?**
- Check that `/data/posts.json` exists in your GitHub repo
- Verify API can read from GitHub (check GITHUB_TOKEN permissions)

**Login fails?**
- Verify `ADMIN_PASSWORD` env var is set correctly
- Check JWT_SECRET is defined (at least 32 characters recommended)

**Image uploads fail?**
- Verify GITHUB_TOKEN has `repo` scope
- Check that `site/assets/images/blog/` directory exists

**Blog posts don't have nav/footer?**
- The API automatically includes full nav and footer in generated post HTML
- If missing, regenerate the post by editing and saving again
