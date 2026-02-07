# 🔗 Link n Sync

A modern real-time messaging application built with Next.js, TypeScript, Supabase, and shadcn/ui components.

## ✨ Features

- **🤝 Real-time Messaging** - Instant chat with WebSocket connections
- **👥 User Authentication** - Secure login/signup with Supabase Auth
- **👤 Profile Management** - Dynamic profile display with database integration
- **🎨 Modern UI** - Beautiful shadcn/ui components with dark theme
- **✨ Vibely Effects** - Stunning 3D animations and particle effects
- **📱 Responsive Design** - Mobile-first responsive layout
- **🔔 Notifications** - Unread message badges and alerts
- **🌙 Dark Theme** - Optimized dark mode experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 16.1.6 with TypeScript
- **Backend**: Supabase (PostgreSQL + Real-time)
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/KRISHNA-K19/Link-n-Sync.git

# Navigate to project
cd Link-n-Sync

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:3000
```

### Production

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 📁 Project Structure

```
Link-n-Sync/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ChatApp.tsx          # Main chat layout
│   │   │   ├── ChatWindow.tsx       # Chat interface
│   │   │   ├── UserList.tsx         # User list
│   │   │   └── Profile.tsx          # Profile management
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Auth page
│   ├── components/
│   │   └── ui/                    # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── badge.tsx
│   └── lib/
│       ├── supabase.ts             # Supabase client
│       └── utils.ts                # Utility functions
├── public/                          # Static assets
├── package.json                     # Dependencies
└── README.md                        # This file
```

## 🎨 UI Components

### shadcn/ui Integration
- **Button** - Interactive buttons with hover effects
- **Card** - Beautiful card layouts
- **Input** - Styled form inputs
- **Badge** - Notification badges

### Custom Animations
- **3D Avatar** - Floating animated profile avatar
- **Vibely Effects** - Particle animations and glows
- **Smooth Transitions** - Page transitions and hover states
- **Pulsing Elements** - Dynamic background effects

## 🔐 Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Messages Table
```sql
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🌐 Live Demo

**🔗 Check it out**: https://link-n-sync.vercel.app

Features demonstrated:
- Real-time messaging
- User authentication
- Profile management
- 3D animations
- Responsive design
- Dark theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Supabase** - Backend and authentication
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

---

**Built with ❤️ using modern web technologies for the best user experience.**

## 🔗 Links

- **Live App**: https://link-n-sync.vercel.app
- **GitHub**: https://github.com/KRISHNA-K19/Link-n-Sync
- **Issues**: https://github.com/KRISHNA-K19/Link-n-Sync/issues

---

*"Link n Sync - Where squad connects in real-time"* 🤝
