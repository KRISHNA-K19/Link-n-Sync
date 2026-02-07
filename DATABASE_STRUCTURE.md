# VibeChat Database Structure

## Overview
VibeChat uses Supabase as the backend database with PostgreSQL. The database stores user profiles, messages, and authentication data.

## Tables

### 1. `profiles` Table
Stores user profile information including avatars and usernames.

**Columns:**
- `id` (uuid, Primary Key) - User ID (references auth.users)
- `email` (text) - User email address
- `username` (text, nullable) - Custom display username
- `avatar_url` (text, nullable) - URL to user's profile picture
- `created_at` (timestamp) - When the profile was created

**Sample Data:**
```sql
INSERT INTO profiles (id, email, username, avatar_url, created_at) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'user@example.com', 'vibe_user', 'https://example.com/avatar.jpg', '2024-01-01T00:00:00Z');
```

### 2. `messages` Table
Stores all chat messages between users.

**Columns:**
- `id` (uuid, Primary Key) - Unique message identifier
- `sender_id` (uuid) - ID of the user who sent the message
- `receiver_id` (uuid) - ID of the user who received the message
- `content` (text) - Message content
- `created_at` (timestamp) - When the message was sent

**Sample Data:**
```sql
INSERT INTO messages (id, sender_id, receiver_id, content, created_at) VALUES
('msg-123', 'user1-id', 'user2-id', 'Hey! How are you?', '2024-01-01T12:00:00Z');
```

### 3. `auth.users` Table (Supabase Auth)
Built-in Supabase authentication table.

**Key Columns:**
- `id` (uuid) - User unique identifier
- `email` (text) - User email
- `created_at` (timestamp) - Account creation time

## Storage

### Avatars Bucket
- **Bucket Name:** `avatars`
- **Purpose:** Store user profile pictures
- **File Naming:** `{user_id}-{timestamp}.{extension}`
- **Public Access:** Enabled for profile picture URLs

**Sample Avatar URL Structure:**
```
https://[project-ref].supabase.co/storage/v1/object/public/avatars/123e4567-e89b-12d3-a456-426614174000-1704067200000.jpg
```

## Real-time Subscriptions

### Message Channels
The app uses Supabase real-time subscriptions to listen for new messages:

**Channel Pattern:** `chat_{user1_id}_{user2_id}` (sorted alphabetically)

**Example Events:**
```javascript
// Listen for new messages
supabase
  .channel('chat_user1_user2')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      // Handle new message
      console.log('New message:', payload.new);
    }
  )
  .subscribe();
```

## Database Setup SQL

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  username TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created ON messages(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view messages they sent or received" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert messages they sent" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
```

## Current User Profile Example

**Sample Profile Data:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "vibechat@example.com",
  "username": "VibeMaster",
  "avatar_url": "https://picsum.photos/seed/vibechat-avatar/200/200.jpg",
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Sample Messages:**
```json
[
  {
    "id": "msg-001",
    "sender_id": "123e4567-e89b-12d3-a456-426614174000",
    "receiver_id": "456e7890-e12b-34d5-a678-426614174111",
    "content": "Hey! Welcome to VibeChat! 🎉",
    "created_at": "2024-01-01T12:00:00Z"
  },
  {
    "id": "msg-002", 
    "sender_id": "456e7890-e12b-34d5-a678-426614174111",
    "receiver_id": "123e4567-e89b-12d3-a456-426614174000",
    "content": "Thanks! Excited to be here! 🚀",
    "created_at": "2024-01-01T12:01:00Z"
  }
]
```

## Features Implemented

✅ **Profile Management**
- Custom usernames
- Avatar upload/download
- Profile viewing

✅ **Messaging System**
- Real-time message delivery
- Message history
- User-to-user conversations

✅ **Security**
- Row Level Security (RLS)
- User authentication via Supabase Auth
- Secure file storage

✅ **Real-time Features**
- Live message updates
- Online status indicators
- Notification system
