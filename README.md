Digital Health LIFF Mini App
=================================

This project is a LINE LIFF (LINE Front-end Framework) mini web application built with the Next.js Pages Router. It provides a landing hub with 4 core menus:

1. 🤖 ผู้ช่วย AI (Assistant)
2. 🎓 หลักสูตร & การอบรม (Training)
3. 📚 คลังความรู้ (Knowledge)
4. 📈 ประเมินผล & ใบรับรอง (Evaluation)

Current status: Basic navigation pages + LIFF initialization scaffold (awaiting real LIFF ID).

---

Quick Start (Local)
-------------------
1. Install dependencies:
```bash
npm install
```
2. Create `.env.local`:
```bash
NEXT_PUBLIC_LIFF_ID=YOUR_LIFF_ID_HERE
```
3. Run dev server:
```bash
npm run dev
```
4. Open http://localhost:3000

If opened outside LINE, LIFF login will redirect once a valid LIFF ID is set.

---

Creating a LIFF ID
------------------
1. Go to https://developers.line.biz/console/
2. Create a Provider (if you don't have one)
3. Create a Channel (Messaging API)
4. In LIFF tab: Add LIFF App
	- Size: Full
	- Endpoint URL: (later your deployed Vercel URL, e.g. https://digital-health-liff.vercel.app)
	- Scope: openid, profile (and others if needed later)
5. Copy the LIFF ID → place into `.env.local` as `NEXT_PUBLIC_LIFF_ID`

Re-run the dev server after changing environment variables.

---

Deploy on Vercel
----------------
1. Push this repository to GitHub
2. Login to https://vercel.com with GitHub
3. New Project → Import your repo
4. Keep defaults (Build Command: `next build`, Output: `.next`)
5. Deploy → note the production URL
6. Add Environment Variable in Vercel Project Settings:
	- Name: `NEXT_PUBLIC_LIFF_ID`
	- Value: (your real LIFF ID)
	- Apply to: Production + Preview
7. Redeploy

---

Using LIFF SDK (Basics)
-----------------------
The app initializes LIFF in `pages/index.js`:
```js
await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID })
```
Common next steps:
```js
// Send a message back to the chat (only inside LIFF in LINE app)
await liff.sendMessages([{ type: 'text', text: 'Hello from LIFF!' }]);

// Close LIFF window
liff.closeWindow();
```

---

Project Scripts
---------------
```bash
npm run dev     # Start development server
npm run build   # Production build
npm start       # Run built app
```

---

Original Create Next App README (Reference)
------------------------------------------
This section below is the original scaffold reference from Create Next App.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (Original Template Text)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
