# 🚀 WHAT TO DO IN SUPABASE - QUICK START

## Your Supabase Project Details
- **URL:** https://riiuxrcjuugfiuinnrkm.supabase.co
- **Project ID:** riiuxrcjuugfiuinnrkm

## ⚡ 5 QUICK STEPS TO GET STARTED

### Step 1️⃣: Create Tables
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste all SQL from `SUPABASE_SETUP.md` under "Step 1: Create Required Tables"
3. Click "Run"

### Step 2️⃣: Enable Row Level Security (RLS)
1. Still in **SQL Editor**
2. Copy and paste all SQL from `SUPABASE_SETUP.md` under "Step 2: Set Up Row Level Security"
3. Click "Run"

### Step 3️⃣: Enable Realtime
1. Go to **Database** → **Replication**
2. Toggle ON the `messages` table
3. Make sure event type includes `INSERT`

### Step 4️⃣: Test Authentication
1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Optional: Set redirect URL to `http://localhost:3000/auth/callback`

### Step 5️⃣: Start the App
```bash
npm install
npm run dev
```

## 🎯 What Each Part Does

### 📊 Tables Created:

**profiles** table:
- Stores user information
- Automatically created when users sign up
- Contains: id, email, created_at

**messages** table:
- Stores all chat messages
- Links sender_id and receiver_id to users
- Contains: id, sender_id, receiver_id, content, created_at

### 🔐 Security Policies:

**RLS (Row Level Security)** - Users can only see:
- Their own profile
- Messages they sent or received
- Other users' profiles (for the user list)

### ⚡ Realtime Features:

- When someone sends a message, it appears instantly for both users
- Uses Supabase Realtime to sync data in real-time

## 🧪 Test It Out

1. **Create Account 1:**
   - Sign up with: user1@example.com / password123

2. **Create Account 2** (new browser/incognito):
   - Sign up with: user2@example.com / password123

3. **Start Chatting:**
   - User 1 sees User 2 in the sidebar
   - Click to open chat
   - Send a message
   - See it appear instantly!

## ❓ Common Questions

**Q: Do I need to manually create users?**
A: No! Users are created automatically when they sign up through the app.

**Q: Will my messages be encrypted?**
A: They're stored securely in Supabase. For end-to-end encryption, you'd need additional setup.

**Q: Can I see all messages in the Supabase dashboard?**
A: Yes, go to **Table Editor** → **messages** to view all messages directly.

**Q: What if RLS policies don't work?**
A: Double-check the SQL syntax and ensure RLS is enabled on both tables.

## 📚 For More Details

See the complete setup guide in `SUPABASE_SETUP.md`

## 🎉 You're All Set!

Once you complete these 5 steps, your real-time chat app will be ready to use!

Questions? Check the troubleshooting section in README_CHAT.md
