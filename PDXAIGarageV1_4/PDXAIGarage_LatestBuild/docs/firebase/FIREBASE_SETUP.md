# Firebase Setup — LatestBuild

1. Go to Firebase Console.
2. Create project: PDX AI Garage.
3. Add a Web App.
4. Copy the Firebase config.
5. Paste it into:
   assets/js/firebase-config.js
6. Enable Authentication > Email/Password.
7. Create Firestore Database.
8. Add these Firestore rules:

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

## Test

- Open /LatestBuild/auth.html
- Create account
- Go to Journey Zero
- Choose identity
- Save Impossible List
- Complete Journey Zero
- Open Dashboard
