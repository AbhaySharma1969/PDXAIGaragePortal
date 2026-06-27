# PDX AI Garage v1.3 Auth

This version adds real student/builder account creation and login using Firebase Authentication and Firestore.

## Included
- Email/password sign up
- Login/logout
- Protected dashboard
- Protected Journey Zero and Journey One
- Cloud-saved Builder profile
- Cloud-saved XP and mission completion
- Cloud-saved Builder Notebook reflections
- Garage Passport connected to Firestore progress

## Required setup before auth works
Edit:

```text
assets/js/firebase-config.js
```

Paste your Firebase web app configuration.

See:

```text
docs/firebase/FIREBASE_SETUP.md
```

## Deploy
Upload the contents of this folder to your site root.

For pdxaigarage.com root:

```text
public_html/
```

For subfolder:

```text
public_html/PDXAIGarage/
```
