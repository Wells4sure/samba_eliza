# Setup Checklist

Follow these steps to get your wedding registration system up and running with Firebase.

## ✅ Pre-Setup (Already Done)

- [x] Firebase packages installed
- [x] Code migrated from SQLite to Firestore
- [x] Environment variable templates created
- [x] Documentation written

## 📋 Your To-Do List

### Step 1: Firebase Project Setup

- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Create a new Firebase project
- [ ] Enable Firestore Database
- [ ] Choose production mode
- [ ] Select your region

### Step 2: Get Firebase Credentials

- [ ] Go to Project Settings > Service Accounts
- [ ] Click "Generate new private key"
- [ ] Download the JSON file
- [ ] **Keep the JSON file secure** (don't share it!)

### Step 3: Configure Environment Variables

- [ ] Open the downloaded JSON file
- [ ] Copy the `project_id` value
- [ ] Copy the `client_email` value
- [ ] Copy the `private_key` value (entire string including `\n`)
- [ ] Open `.env.local` in your project
- [ ] Replace `FIREBASE_PROJECT_ID` with your project ID
- [ ] Replace `FIREBASE_CLIENT_EMAIL` with your client email
- [ ] Replace `FIREBASE_PRIVATE_KEY` with your private key
- [ ] Save the file

### Step 4: Set Firestore Security Rules

- [ ] In Firebase Console, go to Firestore Database > Rules
- [ ] Copy the rules from `FIREBASE_SETUP.md`
- [ ] Paste and publish the rules

### Step 5: Test Locally

- [ ] Run `pnpm install` (if you haven't already)
- [ ] Run `pnpm dev`
- [ ] Visit `http://localhost:3000/admin`
- [ ] Generate a test registration link
- [ ] Open the link in a new tab
- [ ] Complete the registration form
- [ ] Verify confetti appears on success
- [ ] Check `http://localhost:3000/admin/guests`
- [ ] Verify your test registration appears
- [ ] Go to Firebase Console > Firestore
- [ ] Verify data appears in both collections

### Step 6: Customize Content

Edit these files with your wedding details:

- [ ] `components/hero.tsx` - Update names, date, venue
- [ ] `components/story.tsx` - Add your love story
- [ ] `components/details.tsx` - Update ceremony/reception info
- [ ] `components/gallery.tsx` - Add your photos
- [ ] `components/footer.tsx` - Update contact info

### Step 7: Production Deployment

#### Option A: Vercel (Recommended)

- [ ] Push code to GitHub
- [ ] Sign up for [Vercel](https://vercel.com)
- [ ] Import your GitHub repository
- [ ] Add environment variables in Vercel dashboard:
  - [ ] `FIREBASE_PROJECT_ID`
  - [ ] `FIREBASE_CLIENT_EMAIL`
  - [ ] `FIREBASE_PRIVATE_KEY`
  - [ ] `NEXT_PUBLIC_BASE_URL` (your domain)
- [ ] Deploy
- [ ] Test the deployed site

#### Option B: Other Platforms

- [ ] Set environment variables in your platform
- [ ] Deploy according to platform docs
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production URL
- [ ] Test the deployed site

### Step 8: Generate Guest Links

- [ ] Go to `/admin` on your production site
- [ ] Generate links for each guest
- [ ] Keep a spreadsheet with:
  - Guest name
  - Registration link
  - Status (sent/pending)

### Step 9: Share Links

- [ ] Send registration links to guests via:
  - [ ] Email
  - [ ] WhatsApp
  - [ ] SMS
  - [ ] Wedding website
- [ ] Track who has registered

### Step 10: Monitor Registrations

- [ ] Check `/admin/guests` regularly
- [ ] Export to CSV for planning
- [ ] Follow up with guests who haven't registered

## 🔒 Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit Firebase credentials to git
- [ ] Firestore security rules are set to production mode
- [ ] Service account JSON is stored securely
- [ ] Consider adding admin authentication (future enhancement)

## 📊 Optional Enhancements

- [ ] Set up email notifications for new registrations
- [ ] Add admin authentication
- [ ] Create QR codes for registration links
- [ ] Set up automatic reminder emails
- [ ] Add photo upload feature for guests
- [ ] Integrate with Google Sheets for planning

## 🆘 Troubleshooting

If you encounter issues:

1. Check `FIREBASE_SETUP.md` for detailed setup instructions
2. Verify all environment variables are set correctly
3. Restart your dev server after changing `.env.local`
4. Check Firebase Console for error logs
5. Review `MIGRATION_SUMMARY.md` for common issues

## 📞 Need Help?

- Read: `README.md` - Complete documentation
- Read: `FIREBASE_SETUP.md` - Detailed Firebase guide
- Read: `MIGRATION_SUMMARY.md` - Migration details
- Contact: [iamwchanda@gmail.com](mailto:iamwchanda@gmail.com)

---

**Good luck with your wedding! 💒 🎉**
