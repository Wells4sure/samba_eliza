# Wedding Invitation & Registration System

A beautiful, elegant wedding invitation website with a unique link-based registration system powered by Firebase Firestore.

## Features

### 1. Gold/Amber Theme
The website features an elegant gold and amber color scheme that gives it a luxurious, professional appearance perfect for weddings.

### 2. Unique Registration Links
- Each guest receives a unique, one-time-use registration link
- Links are validated before allowing registration
- Once used, links cannot be reused (prevents duplicate registrations)
- Confetti celebration animation on successful registration

### 3. Admin Panel

#### Generate Links (`/admin`)
- Create unique registration links for guests
- Optionally pre-fill guest names
- Copy generated links to clipboard
- Each link can only be used once

#### View Registered Guests (`/admin/guests`)
- View all registered guests in a table
- See guest details: name, phone, number of guests, dietary restrictions, messages
- Export guest list to CSV
- Track total number of registrations and total guest count

### 4. Guest Registration (`/register/[token]`)
- Full wedding invitation experience with:
  - Hero section with couple names and date
  - Love story section
  - Wedding details (ceremony & reception)
  - Photo gallery
- Token validation on page load
- Pre-fills guest name if provided during link generation
- Collects guest information:
  - Full name
  - Phone number
  - Number of guests
  - Dietary restrictions
  - Personal message for the couple
- Confetti celebration on successful registration
- Prevents reuse of registration links

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Database**: Firebase Firestore
- **Animations**: tsparticles (confetti effect)
- **Icons**: Lucide React

## Firebase Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, navigate to your project

### 2. Create Firestore Database

1. In the Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in production mode" (or test mode for development)
4. Select a location for your database
5. Click "Enable"

### 3. Generate Service Account Key

1. Go to **Project Settings** (gear icon) > **Service Accounts**
2. Click "Generate new private key"
3. A JSON file will be downloaded - keep this secure!
4. You'll need these values from the JSON file:
   - `project_id`
   - `client_email`
   - `private_key`

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your Firebase credentials:
   ```env
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   **Important**:
   - Keep the quotes around `FIREBASE_PRIVATE_KEY`
   - Ensure the `\n` characters are preserved in the private key
   - Never commit `.env.local` to version control

### 5. Firestore Security Rules (Optional but Recommended)

Set up security rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow server-side access (Firebase Admin SDK)
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

This ensures only your server (via Admin SDK) can access the data.

## Installation

1. **Clone the repository** (or download the project)

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Set up Firebase** (see Firebase Setup section above)

4. **Run the development server**:
   ```bash
   pnpm dev
   ```

5. **Open your browser** and navigate to:
   - Main page: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## Usage Flow

1. **Admin**: Visit `/admin` and generate a unique link for each guest
2. **Admin**: Share the generated link with the guest (via email, SMS, WhatsApp, etc.)
3. **Guest**: Clicks the unique link and views the full wedding invitation
4. **Guest**: Scrolls down or clicks "RSVP Now" to reach the registration form
5. **Guest**: Fills out the registration form with their details
6. **System**: Validates the token, saves registration to Firestore, and marks link as used
7. **Guest**: Sees a success message with confetti celebration
8. **Admin**: View all registrations at `/admin/guests` and export to CSV

## Firestore Collections

### `registration_links`
Stores all generated registration links.

```typescript
{
  token: string;              // Unique token (also the document ID)
  guest_name: string | null;  // Optional pre-filled guest name
  created_at: Timestamp;      // When the link was created
  is_used: boolean;           // Whether the link has been used
}
```

### `registrations`
Stores all guest registrations.

```typescript
{
  token: string;                   // Reference to registration link
  guest_name: string;              // Guest's full name
  phone: string | null;            // Guest's phone number
  guests_count: number;            // Number of guests attending
  dietary_restrictions: string | null;  // Dietary requirements
  message: string | null;          // Message for the couple
  registered_at: Timestamp;        // When registration was completed
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your production URL)
4. Deploy

### Other Platforms

Ensure you set the environment variables in your deployment platform's settings.

## Security Notes

- Each registration link can only be used once
- Token validation happens server-side via Firebase Admin SDK
- Environment variables are kept secure (never committed to git)
- Firestore security rules prevent direct client access
- Admin routes should be protected with authentication in production

## Customization

### Update Wedding Details

Edit the following files:
- [components/hero.tsx](components/hero.tsx) - Couple names, date, venue
- [components/story.tsx](components/story.tsx) - Your love story
- [components/details.tsx](components/details.tsx) - Ceremony and reception details
- [components/gallery.tsx](components/gallery.tsx) - Photo gallery
- [components/footer.tsx](components/footer.tsx) - Contact information

### Change Theme Colors

The color scheme is defined in Tailwind classes. Main colors used:
- `amber-50`, `amber-100` - Light backgrounds
- `amber-400`, `amber-500`, `amber-600` - Accent colors
- `yellow-50` - Gradient backgrounds

## Future Enhancements

Consider adding:
- Email notifications when guests register
- Admin authentication for the admin panel
- QR codes for registration links
- Guest search and filtering
- Registration editing capability
- Automatic reminders for guests who haven't registered
- SMS notifications
- Photo upload by guests
- RSVP deadline enforcement

## Support

For issues or questions, contact: [iamwchanda@gmail.com](mailto:iamwchanda@gmail.com)

## License

This project is created for personal use. Feel free to customize for your own wedding!
