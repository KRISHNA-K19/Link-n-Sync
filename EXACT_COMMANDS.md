# 🚀 EXACT COMMANDS TO RUN

## Copy these exact commands to your terminal

---

## Step 1: Install Dependencies

```bash
npm install
```

**What it does:**
- Installs all packages from package.json
- Sets up Supabase client
- Sets up Next.js and React

**Expected output:**
```
added 500+ packages in 45s
```

---

## Step 2: Start Development Server

```bash
npm run dev
```

**What it does:**
- Starts Next.js development server
- Hot reloads on file changes
- Compiles TypeScript

**Expected output:**
```
▲ Next.js 16.1.6
  - Local:        http://localhost:3000
```

**When you see this, press Enter and open your browser!**

---

## Step 3: Open in Browser

```
http://localhost:3000
```

**What to see:**
- Sign In / Sign Up page
- Email input
- Password input
- Buttons

---

## Step 4: Create First Test Account

**Type these values:**
- Email: `user1@test.com`
- Password: `password123`
- Click: **Sign Up**

**You should see:**
```
Check your email for verification!
```

---

## Step 5: Verify Email (Temporarily)

**In another terminal tab:**

```bash
# This manually verifies emails for testing
cd c:\Users\krish\OneDrive\Documents\GitHub\realtime-chat
npm run dev
```

**Then in Supabase:**
1. Go to SQL Editor
2. Paste this:
```sql
UPDATE auth.users SET email_confirmed_at = NOW() 
WHERE email = 'user1@test.com';
```
3. Click Run

---

## Step 6: Create Second Test Account

**Open new browser tab in PRIVATE/INCOGNITO:**

```
http://localhost:3000
```

**Type these values:**
- Email: `user2@test.com`
- Password: `password123`
- Click: **Sign Up**

**Verify email:**
```sql
UPDATE auth.users SET email_confirmed_at = NOW() 
WHERE email = 'user2@test.com';
```

---

## Step 7: Test Real-Time Chat

### In Tab 1 (user1@test.com):
- Click **Sign In**
- Type: `user1@test.com`
- Type: `password123`
- Click **Sign In**
- Should see: User 2 in sidebar
- Click on: User 2
- Type message: `Hello User 2!`
- Click: **Send**

### In Tab 2 (user2@test.com):
- Click **Sign In**
- Type: `user2@test.com`
- Type: `password123`
- Click **Sign In**
- You should see **message instantly** ⚡

---

## Stop the Development Server

**To stop the server:**
```
Ctrl + C
```

(In the terminal where you ran `npm run dev`)

---

## Rebuild if Needed

```bash
npm run build
```

**Then run:**
```bash
npm start
```

---

## Clear Cache (If Issues)

```bash
# Clear node modules cache
rm -r node_modules package-lock.json

# Reinstall
npm install

# Start again
npm run dev
```

---

## Debugging Commands

### View Logs
```bash
# All logs to file
npm run dev > logs.txt 2>&1
```

### Check Port
```bash
# Check what's using port 3000
netstat -ano | findstr :3000
```

### Use Different Port
```bash
npm run dev -- --port 3001
```

Open: http://localhost:3001

---

## Deployment Commands

### Build for Production
```bash
npm run build
```

### Test Production Build
```bash
npm start
```

### Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## Supabase Database Verification

### Check All Tables
```sql
-- Run in Supabase SQL Editor

-- See profiles
SELECT * FROM profiles;

-- See messages
SELECT * FROM messages;

-- See RLS policies
SELECT * FROM pg_policy;
```

### Test RLS
```sql
-- Verify RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE tablename IN ('profiles', 'messages');
```

---

## Quick Troubleshooting Commands

### Kill Process on Port 3000
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Verify Environment Variables
```bash
# Check .env.local exists
cat .env.local

# Or just verify it's there
dir .env.local
```

---

## View Files Structure

```bash
# List all source files
dir src /s

# List all markdown docs
dir *.md

# Count lines of code
wc -l src/app/components/*.tsx
```

---

## One-Line Quick Start

Copy this entire line:
```bash
npm install && npm run dev
```

Then press Enter. It will:
1. Install dependencies
2. Start the development server
3. Open http://localhost:3000 automatically

---

## Production Deployment

### Deploy to Vercel (Easiest)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then follow the prompts!

---

## Docker Commands (Optional)

### Build Docker Image
```bash
docker build -t realtime-chat .
```

### Run Docker Container
```bash
docker run -p 3000:3000 realtime-chat
```

---

## Environment Setup Verification

```bash
# Check everything is set up
echo %NEXT_PUBLIC_SUPABASE_URL%
echo %NEXT_PUBLIC_SUPABASE_ANON_KEY%

# Should both print your keys
```

---

## Git Commands

```bash
# Check git status
git status

# See commit history
git log

# Create new branch
git checkout -b feature/my-feature

# Switch back to main
git checkout main
```

---

## Final Checklist

Run these commands in order:

```bash
# 1. Navigate to project
cd c:\Users\krish\OneDrive\Documents\GitHub\realtime-chat

# 2. Install
npm install

# 3. Check file structure
dir src\app\components

# 4. Verify environment
type .env.local

# 5. Start development
npm run dev

# 6. Open browser
start http://localhost:3000
```

---

## Common Issues & Commands

### Issue: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Issue: "Port 3000 already in use"
```bash
npm run dev -- --port 3001
```

### Issue: "Module not found errors"
```bash
rm -r .next
npm run dev
```

### Issue: "Env vars not loading"
```bash
# Restart the dev server completely
# Kill it: Ctrl + C
# Then: npm run dev
```

---

## Success Indicators

After running `npm run dev`, you should see:

```
▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.3s
```

If you see this, **it's working!** ✅

---

## Getting Help

If commands don't work:

1. **Check Node.js installed:** `node -v`
2. **Check npm installed:** `npm -v`
3. **Check you're in right folder:** `cd c:\Users\krish\OneDrive\Documents\GitHub\realtime-chat`
4. **Clear cache:** `rm -r node_modules && npm install`
5. **Check internet:** Make sure you're connected
6. **Check firewall:** Port 3000 might be blocked

---

## That's It!

**Everything you need is:**
1. `npm install`
2. `npm run dev`
3. Open browser to `http://localhost:3000`

**Now follow the app and chat!** ⚡

---

**Status: READY TO LAUNCH** ✅
