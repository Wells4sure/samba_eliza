# Quick Start Guide - Get Your Firebase Credentials

Your project ID is already set: **samba-elizabeth** ✅

Now you need to get 2 more values from Firebase.

## Step-by-Step Instructions

### 1. Download Service Account Key

1. Go to: https://console.firebase.google.com/project/samba-elizabeth/settings/serviceaccounts/adminsdk
2. Click the blue button **"Generate new private key"**
3. Click **"Generate key"** in the popup
4. A JSON file will download (e.g., `samba-elizabeth-xxxxx.json`)

### 2. Open the Downloaded JSON File

Open the downloaded file in a text editor. You'll see something like:

```json
{
  "type": "service_account",
  "project_id": "samba-elizabeth",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...(long string)...xyz\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@samba-elizabeth.iam.gserviceaccount.com",
  "client_id": "123456789...",
  ...
}
```

### 3. Copy the Values

You need these 2 values:

#### A. `client_email`
Copy the entire email address. Example:
```
firebase-adminsdk-a1b2c@samba-elizabeth.iam.gserviceaccount.com
```

#### B. `private_key`
Copy the ENTIRE private key including the BEGIN and END lines. Example:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
...many lines of random characters...
...xyz123
-----END PRIVATE KEY-----
```

**Important**: Keep all the `\n` characters in the private key!

### 4. Update `.env.local`

Open `.env.local` in your project and replace:

```env
FIREBASE_CLIENT_EMAIL=PASTE_CLIENT_EMAIL_HERE
```
with:
```env
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-a1b2c@samba-elizabeth.iam.gserviceaccount.com
```

And replace:
```env
FIREBASE_PRIVATE_KEY="PASTE_PRIVATE_KEY_HERE"
```
with:
```env
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

### 5. Save and Test

1. Save `.env.local`
2. Run: `pnpm dev`
3. Visit: `http://localhost:3000/admin`
4. Click "Generate Link"
5. If it works, you'll see a registration link! 🎉

## Example `.env.local` (After Filling In)

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=samba-elizabeth
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-a1b2c@samba-elizabeth.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"

# Application URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Firebase Web Config (Optional)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAxqBGJmZNJPcBs1Hbp2ksoLe34TahJ8B4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=samba-elizabeth.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=samba-elizabeth
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=samba-elizabeth.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=790127109569
NEXT_PUBLIC_FIREBASE_APP_ID=1:790127109569:web:7683d64d236c456b827b40
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-Z84JVQ7LR8
```

## Common Issues

### Issue: "Permission denied" error

**Solution**: Make sure you've enabled Firestore Database:
1. Go to Firebase Console > Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a region (e.g., us-central)
5. Click "Enable"

### Issue: "Invalid private key"

**Solution**:
- Make sure the private key is wrapped in quotes
- Keep all `\n` characters
- The entire key should be on ONE line with `\n` for line breaks

### Issue: Build errors

**Solution**: Restart your dev server after changing `.env.local`:
```bash
# Stop the server (Ctrl+C)
pnpm dev
```

## Firestore Security Rules

Don't forget to set security rules!

1. Go to: https://console.firebase.google.com/project/samba-elizabeth/firestore/rules
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click "Publish"

This ensures only your server can access the database.

## Testing Checklist

- [ ] Downloaded service account JSON file
- [ ] Copied `client_email` to `.env.local`
- [ ] Copied `private_key` to `.env.local`
- [ ] Enabled Firestore Database in Firebase Console
- [ ] Set Firestore security rules
- [ ] Ran `pnpm dev`
- [ ] Visited `http://localhost:3000/admin`
- [ ] Successfully generated a test link
- [ ] Opened the test link and registered
- [ ] Saw confetti animation on success
- [ ] Checked `http://localhost:3000/admin/guests` - saw the registration
- [ ] Checked Firebase Console - saw data in Firestore

## Need Help?

If you get stuck:
1. Check `FIREBASE_SETUP.md` for detailed instructions
2. Make sure Firestore is enabled in your Firebase project
3. Verify the private key format is correct (with `\n` and quotes)
4. Restart your dev server after changing environment variables

---

**You're almost there! Just 2 values to paste and you're done!** 🚀
