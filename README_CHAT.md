# Real-Time Chat Application

A modern, real-time chat messaging application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

- **User Authentication** - Secure email/password authentication powered by Supabase Auth
- **Real-Time Messaging** - Messages sync instantly across all connected clients using Supabase Realtime
- **User Directory** - Browse all registered users and start conversations
- **Responsive Design** - Beautiful UI that works on desktop and mobile devices
- **Message History** - Persistent chat history with message timestamps
- **Modern Stack** - Built with React 19, Next.js 16, and TypeScript

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works great)
- Git (for cloning the repo)

## 🛠️ Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

Follow the detailed setup guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md). You need to:

1. Create the `profiles` and `messages` tables
2. Set up Row Level Security (RLS) policies
3. Enable Realtime for the messages table
4. Configure authentication settings

### 3. Configure Environment Variables

The `.env.local` file is already configured with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://riiuxrcjuugfiuinnrkm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎯 Quick Start

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 📱 How to Use

1. **Sign Up/Sign In** - Create a new account or log in with existing credentials
2. **View Users** - See all registered users in the sidebar
3. **Start Chat** - Click on any user to open a conversation
4. **Send Messages** - Type your message and hit Send or press Enter
5. **Real-Time Sync** - Messages appear instantly for both users

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ChatApp.tsx      # Main chat application component
│   │   ├── ChatWindow.tsx   # Individual chat window
│   │   └── UserList.tsx     # List of users
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    └── supabase.ts          # Supabase client setup
```

## 🔐 Security Considerations

- **Row Level Security (RLS)** - All database access is protected by RLS policies
- **Authentication** - Built-in JWT-based authentication via Supabase
- **Environment Variables** - Keep `.env.local` private and never commit it to version control
- **HTTPS Only** - Use HTTPS in production

## 🐛 Troubleshooting

### Messages not appearing in real-time?
- Ensure Realtime is enabled for the `messages` table in Supabase
- Check that RLS policies are correctly configured
- Verify both users exist in the `profiles` table

### Users not showing up?
- Make sure the trigger that creates profiles on signup is working
- Check the `profiles` table in Supabase

### Authentication issues?
- Verify Supabase credentials in `.env.local`
- Check that auth is enabled in your Supabase project
- Clear browser cache and cookies

## 📚 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Backend as a Service (Auth, Database, Realtime)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com) and import your repository
3. Add environment variables from `.env.local`
4. Click Deploy

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 Database Schema

### profiles table
```sql
id (UUID) - Primary key
email (TEXT) - User email
created_at (TIMESTAMP) - Account creation time
```

### messages table
```sql
id (UUID) - Primary key
sender_id (UUID) - Sender's user ID
receiver_id (UUID) - Receiver's user ID
content (TEXT) - Message content
created_at (TIMESTAMP) - Message timestamp
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

Built with ❤️ using Next.js and Supabase
