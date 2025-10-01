# 🚀 Law GPT Buddy - Setup Guide

## Quick Start (Local Development)

### 1. Set up your OpenAI API Key

Create a `.env.local` file in the project root:

```bash
# Create the environment file
echo 'VITE_OPENAI_API_KEY="your-openai-api-key-here"' > .env.local
```

Replace `your-openai-api-key-here` with your actual OpenAI API key (starts with `sk-`).

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

## How It Works

- **Local Development**: When `VITE_OPENAI_API_KEY` is set, the app uses the local API route directly
- **Production**: When deployed, it uses the Supabase Edge Function

## Troubleshooting

### "Failed to get AI response" Error

This usually means:

1. **Missing API Key**: Make sure your OpenAI API key is set in `.env.local`
2. **Invalid API Key**: Verify your API key is valid and has credits
3. **Model Access**: The app uses `gpt-3.5-turbo` for better compatibility

### Testing Your Setup

1. Open your browser console (F12)
2. Check if you see: `Using local development API`
3. Send a test message in the chat
4. Check the console for any error messages

## Alternative: Manual Supabase Function Update

If you want to use the Supabase function instead:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `yuwtymvdvvuemxacaika`
3. Go to **Edge Functions** → **chat**
4. Replace the function code with the updated version from `supabase/functions/chat/index.ts`
5. Set environment variable: `OPENAI_API_KEY` in **Settings** → **Edge Functions**

## Need Help?

- Check the browser console for detailed error messages
- Verify your OpenAI API key has sufficient credits
- Ensure you're using a valid OpenAI API key format
