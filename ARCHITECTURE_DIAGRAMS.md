# 🎯 Real-Time Chat App - Setup & Flow Diagrams

## SUPABASE SETUP FLOW

```
┌─────────────────────────────────────────────────────┐
│   You: Run SQL in Supabase SQL Editor               │
└─────────────────────────┬───────────────────────────┘
                          │
                          ├─→ CREATE profiles TABLE
                          │   ├─→ id (UUID)
                          │   ├─→ email (TEXT)
                          │   └─→ created_at
                          │
                          ├─→ CREATE trigger
                          │   └─→ Auto-create profile on signup
                          │
                          ├─→ CREATE messages TABLE
                          │   ├─→ id (UUID)
                          │   ├─→ sender_id
                          │   ├─→ receiver_id
                          │   └─→ content
                          │
                          ├─→ ENABLE RLS on profiles
                          │   └─→ Add 2 policies
                          │
                          ├─→ ENABLE RLS on messages
                          │   └─→ Add 2 policies
                          │
                          └─→ ENABLE Realtime
                              └─→ Toggle on messages table
```

## APPLICATION FLOW

```
USER AUTHENTICATION
┌──────────────────────────────────────────────────────┐
│                   AUTH PAGE                           │
│  ┌────────────────────────────────────────────────┐  │
│  │  Email: [_____________]                        │  │
│  │  Password: [_____________]                     │  │
│  │  [Sign In]  [Sign Up]                          │  │
│  └────────────────────────────────────────────────┘  │
└───────────────┬──────────────────────────────────────┘
                │
                ├─→ Supabase.auth.signUp/signIn()
                │
                └─→ Creates user in auth.users
                    └─→ Trigger creates profile

MAIN CHAT APPLICATION
┌──────────────────────────────────────────────────────┐
│         CHAT APPLICATION LOADED                       │
│  ┌──────────────────────────────────────────────┐   │
│  │ SIDEBAR         │        CHAT WINDOW          │   │
│  │ ┌────────────┐  │ ┌──────────────────────┐   │   │
│  │ │ Users:     │  │ │ user@email.com       │   │   │
│  │ │ ─────────  │  │ ├──────────────────────┤   │   │
│  │ │ user2 ----►──►│ │  [You sent message]  │   │   │
│  │ │ user3      │  │ │                      │   │   │
│  │ │ user4      │  │ │ [They sent message]  │   │   │
│  │ │            │  │ ├──────────────────────┤   │   │
│  │ │ [Logout]   │  │ │ [Type message...] [▶]  │   │   │
│  │ └────────────┘  │ └──────────────────────┘   │   │
│  └──────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────┘
```

## REAL-TIME MESSAGE FLOW

```
USER A                          SUPABASE                      USER B
┌──────────────┐              ┌──────────────┐             ┌──────────────┐
│   Types msg  │              │              │             │              │
│   Clicks Send│              │              │             │              │
└──────┬───────┘              │              │             │              │
       │                       │              │             │              │
       │  ① INSERT message    │              │             │              │
       ├──────────────────────►│              │             │              │
       │                       │  ② Realtime  │             │              │
       │                       │  Detects INSERT            │              │
       │                       │              │             │              │
       │                       │  ③ Broadcast update       │              │
       │                       ├──────────────────────────►│              │
       │                       │              │             │              │
       │                       │              │  ④ Update UI             │
       │                       │              │  ⚡INSTANT⚡             │
       │                       │              │ Message appears ✓        │
       │                       │              │             │              │
       │  ④ Message         │              │             │              │
       │     appears ✓         │              │             │              │
       │                       │              │             │              │
└──────────────────────────────────────────────────────────────────────────┘

⏱️ Entire process: < 100ms
```

## DATABASE RELATIONSHIPS

```
┌─────────────────────────┐
│   auth.users (Supabase) │
│  ┌────────────────────┐ │
│  │ id (UUID)          │ │
│  │ email (TEXT)       │ │
│  │ password (hashed)  │ │
│  │ ...                │ │
│  └────────────────────┘ │
└──────────┬──────────────┘
           │
           │ (Trigger on INSERT)
           │
           ▼
┌──────────────────────┐
│    profiles table     │
│ ┌──────────────────┐ │
│ │ id (FK)          │─┼─→ auth.users.id
│ │ email (TEXT)     │ │
│ │ created_at       │ │
│ └──────────────────┘ │
└──────────┬───────────┘
           │
           │ (Multiple times per user)
           │
           ▼
┌──────────────────────────────────┐
│      messages table              │
│ ┌──────────────────────────────┐ │
│ │ id (UUID)                    │ │
│ │ sender_id (FK) ────────┐     │ │
│ │ receiver_id (FK) ──┐   │     │ │
│ │ content (TEXT)     │   │     │ │
│ │ created_at         │   │     │ │
│ └────────────┬───────┴─┬─┴─────┘ │
└─────────────│───────┼───────────┘
              │       │
              └───┬───┘
                  │
          ┌───────▼────────┐
          │  profiles.id   │
          │  (both sender  │
          │   & receiver)  │
          └────────────────┘
```

## SUPABASE SECURITY WITH RLS

```
┌──────────────────────────────────────┐
│    User Makes Database Request       │
└───────────────┬──────────────────────┘
                │
                ▼
┌──────────────────────────────────────┐
│  RLS Policy Check (Row Level Sec)    │
│  ┌────────────────────────────────┐  │
│  │ Is user authenticated?         │  │
│  │ ✓ YES → Continue               │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Does policy allow this action? │  │
│  │                                │  │
│  │ For profiles:                  │  │
│  │ ✓ Can view all profiles        │  │
│  │ ✓ Can only edit own profile    │  │
│  │                                │  │
│  │ For messages:                  │  │
│  │ ✓ Can view own messages only   │  │
│  │ ✓ Can insert messages sent by u│  │
│  │ ✓ Cannot delete messages       │  │
│  └────────────────────────────────┘  │
                │
                ├─→ Policy DENIES → ❌ ERROR
                │
                └─→ Policy ALLOWS → ✅ Query executes
```

## DEPLOYMENT FLOW (For Later)

```
┌─────────────────────┐
│  Your Git Repo      │
│  (GitHub/GitLab)    │
└──────────┬──────────┘
           │
           │ Push code
           │
           ▼
┌──────────────────────┐
│  Vercel Dashboard    │
│  (vercel.com)        │
└──────────┬───────────┘
           │
           │ Deploy
           │
           ▼
┌──────────────────────┐
│  Vercel Builds App   │
│  • Installs deps     │
│  • Runs build        │
│  • Optimizes bundles │
└──────────┬───────────┘
           │
           │
           ▼
┌──────────────────────────────────┐
│  App Live!                       │
│  https://yourapp.vercel.app      │
│  Connected to Supabase Backend   │
└──────────────────────────────────┘
```

---

## WHAT EACH COMPONENT DOES

```
┌─────────────────────────────────────────────────────────────┐
│                    ChatApp.tsx                              │
│  • Manages auth state (signup/login)                        │
│  • Shows auth page if not logged in                         │
│  • Manages user session                                     │
└──────────────┬──────────────────────┬──────────────────────┘
               │                      │
               ▼                      ▼
      ┌────────────────┐      ┌────────────────┐
      │  UserList.tsx  │      │ ChatWindow.tsx │
      │ ┌────────────┐ │      │ ┌────────────┐ │
      │ │ Fetch users│ │      │ │Load history│ │
      │ │ Show list  │ │      │ │Listen 4 RT │ │
      │ │ On click→  │ │      │ │Display msgs│ │
      │ │ Select user│ │      │ │Send message│ │
      │ └────────────┘ │      │ └────────────┘ │
      └────────────────┘      └────────────────┘
               │                      │
               └──────────┬───────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Supabase Client │
                 │ (supabase.ts)   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │  Supabase API   │
                 │  (Your Project) │
                 └─────────────────┘
```

---

Remember: The entire flow is secured by:
- ✅ User Authentication (Supabase Auth)
- ✅ Row Level Security (RLS policies)
- ✅ Real-time Updates (Supabase Realtime)
- ✅ HTTPS encryption (in production)
