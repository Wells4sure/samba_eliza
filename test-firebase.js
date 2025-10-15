/**
 * Firebase Connection Test Script
 *
 * Run this to verify your Firebase credentials are set up correctly.
 *
 * Usage: node test-firebase.js
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔥 Firebase Connection Test\n');
console.log('=' .repeat(50));

// Check environment variables
console.log('\n1. Checking Environment Variables...\n');

const requiredEnvVars = [
  'FIREBASE_PROJECT_ID',
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_PRIVATE_KEY'
];

let allPresent = true;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (!value || value.includes('PASTE') || value.includes('your-')) {
    console.log(`   ❌ ${envVar}: NOT SET`);
    allPresent = false;
  } else {
    // Show first 30 chars for security
    const preview = value.substring(0, 30) + '...';
    console.log(`   ✅ ${envVar}: ${preview}`);
  }
});

if (!allPresent) {
  console.log('\n❌ ERROR: Please set all required environment variables in .env.local');
  console.log('\n📖 See QUICK_START.md for instructions\n');
  process.exit(1);
}

console.log('\n✅ All environment variables are set!');

// Try to initialize Firebase
console.log('\n2. Initializing Firebase Admin SDK...\n');

try {
  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }

  console.log('   ✅ Firebase Admin SDK initialized successfully!');

  // Test Firestore connection
  console.log('\n3. Testing Firestore Connection...\n');

  const db = admin.firestore();

  // Try to write a test document
  db.collection('_test').doc('connection-test').set({
    timestamp: new Date(),
    status: 'connected'
  })
  .then(() => {
    console.log('   ✅ Successfully wrote to Firestore!');

    // Try to read it back
    return db.collection('_test').doc('connection-test').get();
  })
  .then((doc) => {
    if (doc.exists) {
      console.log('   ✅ Successfully read from Firestore!');
      console.log('   📄 Test data:', doc.data());

      // Clean up test document
      return db.collection('_test').doc('connection-test').delete();
    } else {
      throw new Error('Could not read test document');
    }
  })
  .then(() => {
    console.log('   ✅ Successfully deleted test document!');
    console.log('\n' + '='.repeat(50));
    console.log('\n🎉 SUCCESS! Firebase is working correctly!\n');
    console.log('You can now run: pnpm dev\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n   ❌ Firestore Error:', error.message);

    if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n💡 TIP: Make sure Firestore is enabled in your Firebase Console');
      console.log('   Visit: https://console.firebase.google.com/project/samba-elizabeth/firestore\n');
    } else if (error.message.includes('Private key')) {
      console.log('\n💡 TIP: Check your FIREBASE_PRIVATE_KEY format');
      console.log('   - Must be wrapped in quotes');
      console.log('   - Must include \\n characters');
      console.log('   See QUICK_START.md for examples\n');
    }

    process.exit(1);
  });

} catch (error) {
  console.error('   ❌ Initialization Error:', error.message);

  if (error.message.includes('private_key')) {
    console.log('\n💡 TIP: Your FIREBASE_PRIVATE_KEY might be incorrectly formatted.');
    console.log('   Make sure it:');
    console.log('   - Starts with "-----BEGIN PRIVATE KEY-----\\n"');
    console.log('   - Ends with "\\n-----END PRIVATE KEY-----\\n"');
    console.log('   - Has \\n characters (not actual newlines)');
    console.log('   - Is wrapped in double quotes\n');
  }

  process.exit(1);
}
