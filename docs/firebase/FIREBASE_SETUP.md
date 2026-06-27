# Firebase Setup for PDX AI Garage v1.3

## 1. Create Firebase project
Go to Firebase Console and create a project called:

PDX AI Garage

## 2. Add a web app
Click the web icon `</>` and register the app.

## 3. Copy Firebase config
Paste the config into:

assets/js/firebase-config.js

Replace all `PASTE_...` values.

## 4. Enable Authentication
Firebase Console → Authentication → Sign-in method → Email/Password → Enable.

## 5. Create Firestore Database
Firebase Console → Firestore Database → Create database.

Start in production mode if you are comfortable applying rules below.

## 6. Firestore rules
Use these rules for early testing:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /builders/{userId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;

      match /notes/{noteId} {
        allow read, create, update, delete: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## 7. Test flow
1. Open auth.html
2. Create account
3. Go to Journey Zero
4. Choose identity
5. Save Impossible List
6. Complete Journey Zero
7. Go to Dashboard
8. Confirm XP, identity, passport stamp, notes

## Important
Do not promote broadly until:
- Firebase config is pasted
- Firestore rules are applied
- You test account creation
- You add password reset or document manual support process
