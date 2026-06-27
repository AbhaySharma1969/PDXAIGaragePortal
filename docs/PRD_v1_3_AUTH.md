# PDX AI Garage PRD v1.3 Auth

## What changed
v1.3 converts the static prototype into a real authenticated builder experience using Firebase.

## User journey
1. Visitor lands on homepage.
2. Visitor creates Builder account.
3. Firebase creates authenticated user.
4. Firestore creates builder profile.
5. Builder completes Journey Zero.
6. Builder saves notes and earns XP.
7. Builder completes Journey One.
8. Dashboard shows cloud-saved progress.

## Data model

builders/{uid}
- uid
- email
- displayName
- builderAge
- interests
- cohort
- xp
- identity
- missions
- createdAt
- updatedAt

builders/{uid}/notes/{noteId}
- title
- text
- createdAt

## Known limitations
- No password reset UI yet.
- No admin dashboard yet.
- No parent account type yet.
- No payments yet.
- No email notifications yet.

## Recommended v1.4
- Password reset
- Admin cohort viewer
- Parent consent language
- Connected public join/waitlist flow
