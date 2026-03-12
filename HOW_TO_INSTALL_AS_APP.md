# 📱 Install TNEB Sample as a Mobile App

## What You Need
A free hosting account — **Netlify** (easiest, zero setup).

---

## Step 1 — Host the files (5 minutes)

### Option A: Netlify Drop (No account needed!)
1. Go to **https://app.netlify.com/drop**
2. Select ALL these files and drag them onto the page:
   - `tneb-sample.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
   - `icon-180.png`
   - `splash.png`
3. Netlify gives you a live URL like `https://amazing-app-123.netlify.app`
4. Done! Your app is live on the internet.

### Option B: GitHub Pages (Free, permanent)
1. Create a free account at **github.com**
2. Click **New Repository** → name it `tneb-app` → Public → Create
3. Upload all 7 files above
4. Go to Settings → Pages → Source: Deploy from branch → main
5. Your URL: `https://yourusername.github.io/tneb-app/tneb-sample.html`

---

## Step 2 — Install on Android (Chrome)

1. Open Chrome on your Android phone
2. Visit your Netlify/GitHub URL
3. Wait 3 seconds — an **"Install TNEB Sample"** banner will pop up
4. Tap **Install** → Done!

Or manually:
- Tap the **⋮ menu** (top-right) → **"Add to Home screen"**

✅ The app icon appears on your home screen and opens like a native app.

---

## Step 3 — Install on iPhone (Safari)

> ⚠️ Must use **Safari** — Chrome on iOS does NOT support PWA install.

1. Open **Safari** on your iPhone
2. Visit your hosted URL
3. Tap the **Share button** (box with arrow at bottom)
4. Scroll down and tap **"Add to Home Screen"**
5. Tap **Add** (top-right)

✅ TNEB Sample icon appears on your home screen!

---

## What Works After Install

| Feature | Android | iPhone |
|---|---|---|
| Home screen icon | ✅ | ✅ |
| Full screen (no browser bar) | ✅ | ✅ |
| Offline access | ✅ | ✅ |
| Dark mode | ✅ | ✅ |
| Tamil / English toggle | ✅ | ✅ |
| Bill payment | ✅ | ✅ |
| Receipt download | ✅ | ✅ |
| Real SMS OTP | ✅ (needs backend) | ✅ (needs backend) |
| Push notifications | ✅ | ⚠️ iOS 16.4+ only |

---

## Files Checklist

Make sure ALL these files are in the same folder when uploading:

- [ ] `tneb-sample.html` — main app
- [ ] `manifest.json` — app identity & icons
- [ ] `sw.js` — offline service worker
- [ ] `icon-192.png` — Android icon
- [ ] `icon-512.png` — large icon
- [ ] `icon-180.png` — iPhone icon
- [ ] `splash.png` — loading screen

---

## Troubleshooting

**"Add to Home Screen" not showing on iPhone?**
→ Make sure you're using Safari (not Chrome or Firefox)

**App not updating after changes?**
→ In browser: Settings → Clear Cache → Reload

**Offline not working?**
→ Visit the app once while online first so it caches everything

