# 📋 VISUAL SETUP CHECKLIST

## Phase 1: SUPABASE SETUP ⚙️

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 1: LOG INTO SUPABASE DASHBOARD                  │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  URL: https://app.supabase.com                        │
│  Project: riiuxrcjuugfiuinnrkm                        │
│                                                         │
│  [ ] Logged in                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 2: RUN SQL BLOCK 1 (Profiles Table)             │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Click: SQL Editor (left sidebar)                  │
│  2. Click: New Query                                  │
│  3. Copy from: SQL_COPY_PASTE.md (Block 1)          │
│  4. Paste into editor                                │
│  5. Click: Run ▶                                      │
│  6. Wait: Green checkmark ✓                           │
│                                                         │
│  [ ] Block 1 executed successfully                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 3: RUN SQL BLOCK 2 (Messages Table)            │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Click: New Query                                  │
│  2. Copy Block 2 from: SQL_COPY_PASTE.md             │
│  3. Paste into editor                                │
│  4. Click: Run ▶                                      │
│  5. Wait: Green checkmark ✓                           │
│                                                         │
│  [ ] Block 2 executed successfully                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 4: RUN SQL BLOCK 3 (RLS for Profiles)          │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Click: New Query                                  │
│  2. Copy Block 3 from: SQL_COPY_PASTE.md             │
│  3. Paste & Run                                       │
│  4. Wait: Green checkmark ✓                           │
│                                                         │
│  [ ] Block 3 executed successfully                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 5: RUN SQL BLOCK 4 (RLS for Messages)          │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Click: New Query                                  │
│  2. Copy Block 4 from: SQL_COPY_PASTE.md             │
│  3. Paste & Run                                       │
│  4. Wait: Green checkmark ✓                           │
│                                                         │
│  [ ] Block 4 executed successfully                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 6: ENABLE REALTIME                              │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Click: Database (left sidebar)                    │
│  2. Click: Replication                               │
│  3. Find: messages table                             │
│  4. Toggle: Switch ON (turns green) ✓                │
│                                                         │
│  [ ] Realtime enabled for messages table              │
│                                                         │
│  ⭐ SUPABASE SETUP COMPLETE! ⭐                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 2: LOCAL SETUP 💻

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 7: INSTALL DEPENDENCIES                         │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  In Terminal/PowerShell:                             │
│                                                         │
│  1. Navigate to project:                             │
│     cd c:\Users\krish\OneDrive\Documents\GitHub\     │
│        realtime-chat                                 │
│                                                         │
│  2. Run:                                             │
│     npm install                                      │
│                                                         │
│  3. Wait for completion                              │
│     (shows "added XXX packages")                     │
│                                                         │
│  [ ] Dependencies installed                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 8: START DEVELOPMENT SERVER                     │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  In Terminal/PowerShell:                             │
│                                                         │
│  1. Run:                                             │
│     npm run dev                                      │
│                                                         │
│  2. Wait for message:                                │
│     ✓ Ready in X.XXs                                 │
│     - Local: http://localhost:3000                   │
│                                                         │
│  3. Press: Enter                                     │
│                                                         │
│  [ ] Server started successfully                      │
│                                                         │
│  ⭐ KEEP THIS TERMINAL OPEN! ⭐                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 3: TESTING 🧪

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 9: SIGN UP FIRST USER                           │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Open browser: http://localhost:3000              │
│  2. See: Sign In / Sign Up page                       │
│  3. Click: Sign Up                                    │
│  4. Enter:                                            │
│     Email: user1@test.com                            │
│     Password: password123                            │
│  5. Click: Sign Up button                             │
│  6. See: "Check your email for verification!"        │
│                                                         │
│  [ ] User 1 created                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 10: VERIFY EMAIL 1 (Supabase)                  │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Go back to Supabase Dashboard                     │
│  2. Click: SQL Editor                                │
│  3. Click: New Query                                 │
│  4. Paste:                                            │
│     UPDATE auth.users SET email_confirmed_at =      │
│     NOW() WHERE email = 'user1@test.com';           │
│  5. Click: Run ▶                                      │
│  6. See: Success ✓                                    │
│                                                         │
│  [ ] User 1 email verified                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 11: SIGN UP SECOND USER                         │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Open NEW PRIVATE BROWSER WINDOW                   │
│     (Ctrl + Shift + N in Chrome/Firefox)             │
│  2. Go to: http://localhost:3000                     │
│  3. Click: Sign Up                                    │
│  4. Enter:                                            │
│     Email: user2@test.com                            │
│     Password: password123                            │
│  5. Click: Sign Up button                             │
│                                                         │
│  [ ] User 2 created                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 12: VERIFY EMAIL 2 (Supabase)                  │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  1. Go back to Supabase Dashboard                     │
│  2. Click: SQL Editor                                │
│  3. Click: New Query                                 │
│  4. Paste:                                            │
│     UPDATE auth.users SET email_confirmed_at =      │
│     NOW() WHERE email = 'user2@test.com';           │
│  5. Click: Run ▶                                      │
│                                                         │
│  [ ] User 2 email verified                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 13: TEST REAL-TIME CHAT 💬                      │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  WINDOW 1 (user1):                                    │
│  ────────────────────                                │
│  1. Refresh page: F5                                 │
│  2. Click: Sign In                                   │
│  3. Email: user1@test.com                            │
│  4. Password: password123                            │
│  5. Click: Sign In                                    │
│  6. See: User 2 in sidebar                           │
│  7. Click: User 2                                     │
│  8. Type: "Hello User 2!"                            │
│  9. Click: Send                                       │
│                                                         │
│  [ ] Message 1 sent                                   │
│                                                         │
│  ────────────────────────────────────────────────────│
│                                                         │
│  WINDOW 2 (user2):                                    │
│  ────────────────────                                │
│  1. Refresh page: F5                                 │
│  2. Click: Sign In                                   │
│  3. Email: user2@test.com                            │
│  4. Password: password123                            │
│  5. Click: Sign In                                   │
│  6. See: User 1 in sidebar                           │
│  7. Click: User 1                                     │
│                                                         │
│  ⚡ YOU SHOULD SEE MESSAGE INSTANTLY!                 │
│                                                         │
│  "Hello User 2!" ✅                                   │
│                                                         │
│  [ ] Message received in real-time ⚡                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  STEP 14: TEST REVERSE MESSAGE                        │
│  ─────────────────────────────────────────────────    │
│                                                         │
│  WINDOW 2 (user2):                                    │
│  ────────────────────                                │
│  1. Type: "Hi there!"                                │
│  2. Click: Send                                       │
│                                                         │
│  WINDOW 1 (user1):                                    │
│  ────────────────────                                │
│  ⚡ YOU SHOULD SEE MESSAGE INSTANTLY!                 │
│  "Hi there!" ✅                                       │
│                                                         │
│  [ ] Real-time messaging works both ways ⚡          │
│                                                         │
│  🎉 YOU'RE DONE! 🎉                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Summary

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ✅ SETUP COMPLETE!                                    │
│                                                         │
│  Total Time: ~30 minutes                              │
│                                                         │
│  What You Have:                                        │
│  ─────────────────────────────────────────────────    │
│  ✅ Working real-time chat app                        │
│  ✅ User authentication                               │
│  ✅ Real-time messaging (< 100ms)                     │
│  ✅ Secure database                                   │
│  ✅ Production-ready code                             │
│  ✅ Full documentation                                │
│                                                         │
│  Next Steps (Optional):                               │
│  ─────────────────────────────────────────────────    │
│  → Deploy to Vercel                                  │
│  → Add more users                                    │
│  → Customize design                                  │
│  → Add features                                      │
│                                                         │
│  Questions? See:                                       │
│  → SETUP_CHECKLIST.md (troubleshooting)              │
│  → README_CHAT.md (full docs)                        │
│  → SUPABASE_SETUP.md (detailed guide)                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Print This Out! 🖨️

This checklist is designed to be printed and marked off as you complete each step.

Good luck! 🚀
