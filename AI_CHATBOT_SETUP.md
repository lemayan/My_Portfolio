# AI Chatbot Setup Guide

Your portfolio now features a real AI-powered chatbot using OpenAI's GPT-3.5-turbo API!

## Quick Setup

### 1. Get Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the API key (it starts with `sk-`)

### 2. Add API Key to Your Project

Open the `.env` file in your project root and add your API key:

```env
VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Important:** Never commit your `.env` file to Git! It's already in `.gitignore`.

### 3. Test the Chatbot

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Games page (click "Let's Play" in the navbar)

3. Try asking the AI questions like:
   - "Who is Dennis Lemayan Leleina?"
   - "What projects has he built?"
   - "Tell me about his blockchain experience"
   - "How can I contact him?"
   - Or any general question!

## How It Works

The chatbot uses OpenAI's GPT-3.5-turbo model with a custom system prompt that includes all your portfolio information:
- Your full name (Dennis Lemayan Leleina)
- Your skills and tech stack
- Your 5 portfolio projects
- Your contact information
- Your availability for opportunities

The AI can also:
- Answer general knowledge questions
- Help with programming topics
- Have natural conversations
- Provide helpful information

## API Costs

OpenAI charges based on token usage:
- GPT-3.5-turbo is very affordable (~$0.002 per 1K tokens)
- Each conversation costs a fraction of a cent
- You get free credits when you sign up
- Monitor usage at: https://platform.openai.com/usage

## Troubleshooting

### "AI API is not configured" message
- Make sure you added the API key to `.env`
- Make sure the key starts with `sk-`
- Restart your dev server after adding the key

### "API Error" messages
- Check that your API key is valid
- Verify you have credits in your OpenAI account
- Check your internet connection

### Environment variables not loading
- Make sure the file is named `.env` (not `.env.txt`)
- The variable must start with `VITE_` to be accessible in the frontend
- Restart your development server after changes

## Security Notes

- ✅ Your `.env` file is in `.gitignore` and won't be committed to Git
- ✅ Never share your API key publicly
- ✅ Never commit your API key to version control
- ✅ For production, use environment variables on your hosting platform

## Alternative AI Services

If you prefer a different AI provider, you can modify the `generateResponse` function in `src/sections/Games.jsx` to use:
- Anthropic Claude
- Google Gemini
- Cohere
- Hugging Face

The current implementation is designed to be easily adaptable to other services!

## Support

If you encounter any issues, check:
1. [OpenAI Documentation](https://platform.openai.com/docs)
2. [OpenAI API Status](https://status.openai.com/)
3. Your browser console for error messages
