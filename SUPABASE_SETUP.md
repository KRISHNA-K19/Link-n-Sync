# Supabase Setup Guide for Real-Time Chat App

## Step 1: Create Required Tables

Run these SQL queries in your Supabase SQL Editor:

### Create profiles table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

### Create messages table
```sql
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

## Step 2: Set Up Row Level Security (RLS)

Enable RLS on both tables and add policies:

### For profiles table
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to view other profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  USING (true);
```

### For messages table
```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow users to view their messages
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

-- Allow users to insert messages
CREATE POLICY "Users can insert messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
  );
```

## Step 3: Enable Realtime

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Toggle ON for the `messages` table
4. Make sure the events are set to `INSERT`

## Step 4: Install Required Packages

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

## Step 5: Environment Variables

Your `.env.local` file is already set up with:
```
NEXT_PUBLIC_SUPABASE_URL=https://riiuxrcjuugfiuinnrkm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpaXV4cmNqdXVnZml1aW5ucmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTQ5MTIsImV4cCI6MjA4NTg3MDkxMn0.5B2buYrJMmPfw7mKK7G7Kt2pIl4Yg-uBelkVEnhrkfQ
```

## Step 6: Configure Email Provider (Optional but Recommended)

1. Go to **Authentication** → **Providers** → **Email**
2. Choose between:
   - **Auth0 SMTP** (for production)
   - **Supabase SMTP** (default, works for testing)
3. Set the **Confirmation redirect URL** to your app's callback page

## Step 7: Set Up Email Confirmation

1. In **Authentication** → **Email Templates**
2. Customize the confirmation email template (optional)
3. Make sure **Confirm email** is enabled under **Authentication** → **Policies**

## Features Included

✅ **User Authentication** - Sign up and sign in with email/password
✅ **Real-time Messaging** - Messages appear instantly using Supabase Realtime
✅ **User List** - See all registered users
✅ **Direct Messaging** - Chat privately with any user
✅ **Message History** - View conversation history
✅ **Responsive Design** - Works on desktop and mobile

## Testing the App

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

4. Create two accounts and start chatting!

## Troubleshooting

### Messages not appearing in real-time
- Make sure RLS policies are correct
- Check if Realtime is enabled for the messages table
- Verify both users exist in the profiles table

### Users not showing up in the user list
- Ensure the trigger that creates profiles is working
- Check the profiles table has entries for your users

### Authentication errors
- Verify your Supabase credentials in `.env.local`
- Check that auth is enabled in Supabase dashboard

## Security Notes

⚠️ Never commit `.env.local` to git
⚠️ Your ANON_KEY is public but limited by RLS policies
⚠️ Always use HTTPS in production
⚠️ Review RLS policies regularly for security
