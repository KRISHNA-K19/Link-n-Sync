# 📋 COPY-PASTE SQL FOR SUPABASE

## 🔴 DO NOT MODIFY - COPY EXACTLY AS-IS

### SQL Block 1: Create Profiles Table + Trigger
**Location:** SQL Editor in Supabase Dashboard
**Steps:** Copy → Paste → Click "Run"

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create function to handle new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

### SQL Block 2: Create Messages Table + Indexes
**Location:** SQL Editor in Supabase Dashboard
**Steps:** Copy → Paste → Click "Run"

```sql
-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
```

---

### SQL Block 3: Enable RLS + Policies on Profiles
**Location:** SQL Editor in Supabase Dashboard
**Steps:** Copy → Paste → Click "Run"

```sql
-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policy 3: Users can view all profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);
```

---

### SQL Block 4: Enable RLS + Policies on Messages
**Location:** SQL Editor in Supabase Dashboard
**Steps:** Copy → Paste → Click "Run"

```sql
-- Enable RLS on messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own messages
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

-- Policy 2: Users can insert messages
CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
  );
```

---

### SQL Block 5: Verify Everything Works
**Location:** SQL Editor in Supabase Dashboard
**Purpose:** Check tables exist

```sql
-- Check profiles table exists
SELECT * FROM profiles LIMIT 1;

-- Check messages table exists
SELECT * FROM messages LIMIT 1;

-- Check RLS is enabled on profiles
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('profiles', 'messages');

-- Check trigger exists
SELECT proname FROM pg_proc WHERE proname = 'handle_new_user';
```

If all 4 queries return results without errors, you're good! ✅

---

### SQL Block 6: Manual Verify Email (If Needed)
**Location:** SQL Editor in Supabase Dashboard
**Purpose:** Mark emails as verified for testing

```sql
-- Run ONLY if you want to manually verify test emails
UPDATE auth.users SET email_confirmed_at = NOW() 
WHERE email = 'user1@test.com';

UPDATE auth.users SET email_confirmed_at = NOW() 
WHERE email = 'user2@test.com';
```

---

## ⚠️ IMPORTANT NOTES

1. **Run in order** - Execute SQL Blocks 1-4 in sequence
2. **One block at a time** - Don't paste multiple blocks together
3. **Wait for success** - Green checkmark appears after each block
4. **No modifications** - Copy exactly as shown, don't change names
5. **Realtime toggle** - After all SQL, manually toggle Realtime (see below)

---

## 🔧 MANUAL STEPS (Can't be Done via SQL)

### Enable Realtime
1. In Supabase Dashboard, go to **Database** → **Replication**
2. Find the `messages` table
3. Toggle the switch to **ON** (should turn green)
4. You should see a green checkmark ✓

### Verify Email (If Not Using Auto-Verification)
1. Go to **Authentication** → **Users**
2. Click on each user
3. Find "Email verified" toggle
4. Set to ON for each test user

---

## ✅ VERIFICATION CHECKLIST

After running all SQL blocks:

- [ ] **profiles table** created - Check: **Table Editor → profiles**
- [ ] **messages table** created - Check: **Table Editor → messages**
- [ ] **Trigger** working - New user signup creates profile auto
- [ ] **RLS enabled** on profiles - Check: **Authentication → Policies**
- [ ] **RLS enabled** on messages - Check: **Authentication → Policies**
- [ ] **Realtime enabled** on messages - Check: **Database → Replication**

If all ✓, you're ready to test the app!

---

## 🆘 IF SOMETHING GOES WRONG

### Error: "Relation already exists"
**Means:** Table/trigger already created
**Solution:** That's okay! Just move to next block

### Error: "Syntax error"
**Means:** SQL wasn't copied exactly
**Solution:** Copy again from this file, character by character

### Error: "Permission denied"
**Means:** You don't have right permissions
**Solution:** Check you're logged in as project admin

### No error but nothing happens
**Means:** Check database dropdown (top right)
**Solution:** Make sure correct database/region is selected

---

## 📝 SUMMARY

```
SQL Block 1 → Create profiles table + trigger
     ↓
SQL Block 2 → Create messages table + indexes
     ↓
SQL Block 3 → Enable RLS on profiles
     ↓
SQL Block 4 → Enable RLS on messages
     ↓
SQL Block 5 → Verify everything works (optional)
     ↓
MANUAL STEP → Toggle Realtime ON for messages table
     ↓
✅ COMPLETE - Ready to test app!
```

---

**Ready? Copy Block 1, paste, run. Then repeat for blocks 2-4! 🚀**
