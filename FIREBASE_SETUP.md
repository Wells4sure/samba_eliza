# Firebase Setup Guide

This guide will walk you through setting up Firebase for your wedding registration system.

## Step 1: Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter a project name (e.g., "elizabeth-samba-wedding")
4. Click **Continue**
5. Disable Google Analytics (optional) or configure it
6. Click **Create project**
7. Wait for project to be created, then click **Continue**

## Step 2: Enable Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose a starting mode:
   - **Production mode** (recommended) - Start with secure rules
   - **Test mode** - Open access for 30 days (only for testing)
4. Select a location closest to you (e.g., us-central, europe-west)
5. Click **Enable**

## Step 3: Get Firebase Admin Credentials

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Go to the **"Service accounts"** tab
4. Click **"Generate new private key"**
5. Click **"Generate key"** in the confirmation dialog
6. A JSON file will download - **KEEP THIS SECURE!**

## Step 4: Extract Credentials from JSON

Open the downloaded JSON file. You'll see something like:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  ...
}
```

Extract these three values:
- `project_id`
- `client_email`
- `private_key`

## Step 5: Create .env.local File

1. In your project root, copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

**Important Notes:**
- Keep the **quotes** around `FIREBASE_PRIVATE_KEY`
- **Do NOT** remove the `\n` characters in the private key
- The entire private key should be on one line with `\n` for line breaks
- **NEVER** commit this file to git (it's already in `.gitignore`)

## Step 6: Set Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow server-side access via Admin SDK
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

3. Click **Publish**

This ensures only your server can access the database, not client browsers.

## Step 7: Test the Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Visit `http://localhost:3000/admin`

3. Try generating a registration link:
   - Enter a guest name (optional)
   - Click "Generate Link"
   - If successful, you'll see a link you can copy

4. Check Firestore:
   - Go to Firebase Console > Firestore Database
   - You should see a `registration_links` collection with your test data

## Step 8: Production Deployment

When deploying to production (e.g., Vercel):

1. Add environment variables in your hosting platform:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your production URL, e.g., https://yourwedding.com)

2. Deploy your application

3. Test the admin panel and registration flow

## Troubleshooting

### "Error generating link"

**Problem**: Firebase credentials not set correctly

**Solution**:
- Check that `.env.local` exists and has the correct values
- Ensure private key has quotes around it
- Restart your dev server after changing env variables

### "Permission denied" errors

**Problem**: Firestore security rules are too strict

**Solution**:
- For development, you can use test mode temporarily
- For production, ensure you're using Firebase Admin SDK (server-side)

### "Invalid project ID"

**Problem**: Wrong project ID in environment variables

**Solution**:
- Double-check the `project_id` from your service account JSON
- Ensure no extra spaces or quotes in the env variable

## Data Structure

Your Firestore will have two collections:

### `registration_links`
Each document ID is the token itself:
```
registration_links/
  ├── abc123def456...
  │   ├── token: "abc123def456..."
  │   ├── guest_name: "John Doe"
  │   ├── created_at: Timestamp
  │   └── is_used: false
  └── xyz789ghi012...
      ├── token: "xyz789ghi012..."
      ├── guest_name: null
      ├── created_at: Timestamp
      └── is_used: true
```

### `registrations`
Auto-generated document IDs:
```
registrations/
  ├── [auto-id-1]
  │   ├── token: "abc123def456..."
  │   ├── guest_name: "John Doe"
  │   ├── phone: "+260..."
  │   ├── guests_count: 2
  │   ├── dietary_restrictions: "Vegetarian"
  │   ├── message: "Can't wait!"
  │   └── registered_at: Timestamp
  └── [auto-id-2]
      └── ...
```

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Use production mode** Firestore rules in production
3. **Keep service account JSON** secure and private
4. **Add admin authentication** for `/admin` routes (recommended)
5. **Monitor Firestore usage** to avoid unexpected costs
6. **Set budget alerts** in Google Cloud Console

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

Contact: [iamwchanda@gmail.com](mailto:iamwchanda@gmail.com)
