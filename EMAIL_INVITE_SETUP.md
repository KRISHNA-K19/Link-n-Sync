# Email Invite Feature Setup

Your chat app now has an **Email Invite** button! 📧

## How to Enable Email Invites

### 1. Set Up Gmail App Password
1. Go to your Google Account: https://myaccount.google.com
2. Enable **2-Step Verification** (if not already done)
3. Go to **App passwords** (https://myaccount.google.com/apppasswords)
4. Select **Mail** and **Windows Computer**
5. Copy the generated 16-character password

### 2. Update .env.local
Edit `.env.local` and add:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=xxxx-xxxx-xxxx-xxxx  (the 16-char password from step 1)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Restart the Dev Server
```bash
npm run dev
```

## Using Email Invites

1. **Select a user** in your chat list
2. Click the **📧 Invite** button in the chat header
3. Add an optional personal message
4. Click **Send Invite**
5. The other user will receive an email with your invitation and a link to join the chat!

## Features
- ✅ Send personalized invitation messages
- ✅ Beautiful HTML email template
- ✅ Direct link to chat app
- ✅ Real-time sync with chat messages
- ✅ Works between multiple accounts

## Without Gmail Setup
If you don't set up email, the invite button will still appear but may show an error when clicked. The chat and messaging features work perfectly without email invites!

## Troubleshooting
- **"Failed to send invite"**: Check that EMAIL_USER and EMAIL_PASSWORD are set correctly in .env.local
- **Restart dev server** after updating .env.local for changes to take effect
