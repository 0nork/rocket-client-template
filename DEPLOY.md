# Rocket Client Template — Deployment Guide

Deploy a new client site in ~30 minutes using this template.

## Prerequisites

- Node.js 18+
- A Google Workspace account (for Sheets + Drive CMS)
- A Google Cloud project with Sheets API & Drive API enabled
- Vercel account (for hosting)
- Optional: CRO9 account, CRM sub-account (RocketAdd)

---

## Step 1: Clone the Template

```bash
# Clone from the 0nork org
git clone https://github.com/0nork/rocket-client-template.git client-name-site
cd client-name-site

# Remove the template's git history and start fresh
rm -rf .git
git init
git add .
git commit -m "Initial commit from rocket-client-template"
```

## Step 2: Create the Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Create these tabs (exact names matter):
   - `site_config` — columns: `key`, `value`
   - `services` — columns: `id`, `title`, `slug`, `description`, `image_id`, `icon`, `order`
   - `portfolio` — columns: `id`, `title`, `description`, `image_ids`, `category`, `date`
   - `testimonials` — columns: `id`, `name`, `role`, `text`, `rating`, `image_id`
   - `blog` — columns: `id`, `title`, `slug`, `content`, `excerpt`, `image_id`, `published_at`, `status`
   - `team` — columns: `id`, `name`, `role`, `bio`, `image_id`
   - `faqs` — columns: `id`, `question`, `answer`, `category`
   - `seo` — columns: `page_path`, `title`, `description`, `og_image_id`

3. In the `site_config` tab, add key-value pairs:

| key | value |
|-----|-------|
| business_name | Your Business Name |
| phone | (555) 555-5555 |
| email | info@yourbusiness.com |
| tagline | Professional Services You Can Trust |

4. Copy the **Spreadsheet ID** from the URL: `docs.google.com/spreadsheets/d/{THIS_PART}/edit`

## Step 3: Create the Google Drive Folder

1. Create a new folder in Google Drive for the client's media
2. Inside it, create subfolders: `portfolio`, `team`, `blog`, `general`
3. Upload the client's images into the appropriate subfolders
4. Copy the **Folder ID** from the URL: `drive.google.com/drive/folders/{THIS_PART}`

## Step 4: Create a Google Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project (or use an existing one)
3. Enable **Google Sheets API** and **Google Drive API**
4. Go to **IAM & Admin > Service Accounts** and create a new service account
5. Create a JSON key for the service account
6. **Share the Google Sheet** with the service account email (Editor access)
7. **Share the Drive folder** with the service account email (Editor access)
8. Base64-encode the JSON key:

```bash
base64 -i service-account-key.json | tr -d '\n'
```

Save this base64 string — it's your `GOOGLE_SERVICE_ACCOUNT_KEY`.

## Step 5: Set Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:
- `GOOGLE_SHEETS_ID` — from Step 2
- `GOOGLE_DRIVE_FOLDER_ID` — from Step 3
- `GOOGLE_SERVICE_ACCOUNT_KEY` — base64 from Step 4
- `ADMIN_PASSWORD` — choose a strong password
- `SESSION_SECRET` — generate a random string (`openssl rand -hex 32`)

Optional variables:
- `GEMINI_API_KEY` — client's Gemini API key (for AI features)
- `NEXT_PUBLIC_CRO9_KEY` — CRO9 analytics API key
- `NEXT_PUBLIC_CRM_TRACKING_ID` — CRM tracking ID
- `CRM_CLIENT_ID` / `CRM_CLIENT_SECRET` — for RocketAdd OAuth

Site branding:
- `NEXT_PUBLIC_SITE_NAME` — business name
- `NEXT_PUBLIC_SITE_PHONE` — phone number
- `NEXT_PUBLIC_SITE_EMAIL` — contact email
- `NEXT_PUBLIC_SITE_URL` — production URL
- `NEXT_PUBLIC_COLOR_PRIMARY` — primary brand color (hex)

## Step 6: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — you should see the site with content from your Sheet.

Visit `http://localhost:3000/admin` — log in with your `ADMIN_PASSWORD`.

## Step 7: Deploy to Vercel

```bash
# Push to GitHub (your org/client repo)
git remote add origin https://github.com/YOUR_ORG/client-site.git
git push -u origin main

# Deploy via Vercel CLI or connect repo in Vercel Dashboard
npx vercel --prod
```

Add all environment variables in Vercel Dashboard > Settings > Environment Variables.

## Step 8: Connect Domain

1. In Vercel, go to project Settings > Domains
2. Add the client's domain
3. Configure DNS with a CNAME record pointing to `cname.vercel-dns.com`
4. SSL is automatic

## Step 9: Connect CRM (Optional)

1. Go to `/admin/settings` on the deployed site
2. Click "Connect CRM"
3. Authorize in the client's CRM sub-account
4. Leads from the contact form will now flow into CRM

---

## File Structure Reference

```
app/             — Next.js pages (public site + admin dashboard)
components/      — React components (site/, admin/, ui/)
lib/             — Backend integrations (google/, gemini, crm, cro9)
config/          — Site and sheet schema configuration
public/          — Static assets
```

## Updating Content

Clients can update content in two ways:
1. **Google Sheets** — Edit the spreadsheet directly (changes appear within 5 minutes)
2. **Admin Dashboard** — Use `/admin/content` to edit through the web interface

## Powered by Rocket+

Template by [RocketClients.com](https://rocketclients.com) | Part of the [0nork](https://github.com/0nork) ecosystem
