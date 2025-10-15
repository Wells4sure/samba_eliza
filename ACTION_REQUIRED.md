# ⚡ ACTION REQUIRED - Complete Firebase Setup

Your wedding registration system is **95% complete**! Just 2 quick steps remaining.

## 📋 What You Need To Do RIGHT NOW

### Step 1: Enable Firestore Database (2 minutes)

1. Visit: https://console.firebase.google.com/project/samba-elizabeth/firestore
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose a location (e.g., `us-central` or closest to you)
5. Click **"Enable"**

### Step 2: Get Service Account Credentials (3 minutes)

1. Visit: https://console.firebase.google.com/project/samba-elizabeth/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"** (blue button)
3. Click **"Generate key"** in the popup
4. A JSON file will download

### Step 3: Fill in `.env.local` (2 minutes)

1. Open the downloaded JSON file
2. Find these 2 values:
   - `"client_email"`: Copy this
   - `"private_key"`: Copy this (including the BEGIN and END lines)

3. Open `.env.local` in your project
4. Replace `PASTE_CLIENT_EMAIL_HERE` with the email
5. Replace `PASTE_PRIVATE_KEY_HERE` with the private key
6. Save the file

**Example**:
```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@samba-elizabeth.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...(long string)...\n-----END PRIVATE KEY-----\n"
```

### Step 4: Test Everything (2 minutes)

Run this test script:
```bash
node test-firebase.js
```

If you see **"🎉 SUCCESS!"**, you're done!

If you see errors, check `QUICK_START.md` for troubleshooting.

### Step 5: Start Your App

```bash
pnpm dev
```

Visit: http://localhost:3000/admin

## ✅ Quick Verification

After completing the steps above, test these:

1. **Generate a link**:
   - Go to http://localhost:3000/admin
   - Enter a test name
   - Click "Generate Link"
   - Should see a link you can copy

2. **Register a guest**:
   - Open the generated link
   - Fill out the form
   - Submit
   - Should see confetti! 🎉

3. **View guests**:
   - Go to http://localhost:3000/admin/guests
   - Should see your test registration

4. **Check Firestore**:
   - Visit: https://console.firebase.google.com/project/samba-elizabeth/firestore
   - Should see `registration_links` and `registrations` collections

## 📚 Detailed Help

- **Quick Guide**: See `QUICK_START.md`
- **Full Setup**: See `FIREBASE_SETUP.md`
- **Checklist**: See `SETUP_CHECKLIST.md`
- **Documentation**: See `README.md`

## 🆘 Having Issues?

### "Permission denied" Error
→ Make sure you enabled Firestore Database (Step 1 above)

### "Invalid private key" Error
→ Check the private key format:
- Must be wrapped in quotes: `"..."`
- Must have `\n` characters (not actual line breaks)
- Must include BEGIN and END lines

### Test Script Fails
→ Run: `node test-firebase.js` and read the error message

## 🎯 Current Status

✅ Firebase packages installed
✅ Code migrated to Firestore
✅ Environment template created
✅ Documentation written
✅ Project ID set (`samba-elizabeth`)
✅ Web config added
⏳ **Firestore Database** - Needs enabling
⏳ **Service Account** - Need to generate and add to `.env.local`

## ⏱️ Time Required

- **Total**: ~10 minutes
- **Enable Firestore**: 2 minutes
- **Generate credentials**: 3 minutes
- **Update .env.local**: 2 minutes
- **Test**: 2 minutes

## 🚀 After Setup Complete

Once Firebase is working, you can:

1. **Customize wedding details** in the components
2. **Generate real guest links** at `/admin`
3. **Share links** with your guests
4. **Track RSVPs** at `/admin/guests`
5. **Deploy to production** (Vercel recommended)

---

**You're almost there! Just fill in those 2 values in `.env.local` and you're done!**

Need the quick guide? → Open `QUICK_START.md`
Need detailed help? → Open `FIREBASE_SETUP.md`

🎊 Good luck with your wedding! 💒
