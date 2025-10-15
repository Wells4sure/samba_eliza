/**
 * Environment Variables Checker
 * Run this to verify your .env.local is set up correctly
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking Environment Variables\n');
console.log('='.repeat(60));

// Check each variable
const checks = [
  {
    name: 'FIREBASE_PROJECT_ID',
    expected: 'samba-elizabeth',
    check: (val) => val === 'samba-elizabeth'
  },
  {
    name: 'FIREBASE_CLIENT_EMAIL',
    expected: 'Should end with @samba-elizabeth.iam.gserviceaccount.com',
    check: (val) => val && val.includes('@samba-elizabeth.iam.gserviceaccount.com') && !val.startsWith('PASTE')
  },
  {
    name: 'FIREBASE_PRIVATE_KEY',
    expected: 'Should start with -----BEGIN PRIVATE KEY-----',
    check: (val) => {
      if (!val || val.includes('PASTE')) return false;
      // Remove quotes and check
      const key = val.replace(/^"|"$/g, '');
      return key.includes('-----BEGIN PRIVATE KEY-----') && key.includes('-----END PRIVATE KEY-----');
    }
  }
];

let allValid = true;

checks.forEach(({ name, expected, check }) => {
  const value = process.env[name];
  const isValid = check(value);

  if (isValid) {
    console.log(`\n✅ ${name}`);
    if (name === 'FIREBASE_CLIENT_EMAIL') {
      console.log(`   Value: ${value}`);

      // Check for the extra "f" issue
      if (value.startsWith('ff')) {
        console.log('   ⚠️  WARNING: Email starts with "ff" - should start with "firebase-"');
        console.log('   This might cause authentication issues!');
        allValid = false;
      }
    } else if (name === 'FIREBASE_PRIVATE_KEY') {
      console.log(`   Length: ${value.length} characters`);
      console.log('   Format: ✓ Valid');
    } else {
      console.log(`   Value: ${value}`);
    }
  } else {
    console.log(`\n❌ ${name}`);
    console.log(`   Expected: ${expected}`);
    if (value) {
      console.log(`   Got: ${value.substring(0, 50)}...`);
    } else {
      console.log(`   Got: (not set)`);
    }
    allValid = false;
  }
});

console.log('\n' + '='.repeat(60));

if (allValid) {
  console.log('\n🎉 All environment variables are valid!\n');
  console.log('Next steps:');
  console.log('1. Restart your dev server: pnpm dev');
  console.log('2. Visit http://localhost:3000/admin');
  console.log('3. Try generating a link\n');
} else {
  console.log('\n❌ Some environment variables need attention\n');
  console.log('Please fix the issues above and run this script again.\n');
  console.log('💡 Common fixes:');
  console.log('   - Remove extra "f" from FIREBASE_CLIENT_EMAIL if present');
  console.log('   - Ensure FIREBASE_PRIVATE_KEY has quotes around it');
  console.log('   - Ensure FIREBASE_PRIVATE_KEY includes \\n characters\n');
  process.exit(1);
}
