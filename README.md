# Canadian Personal Injury Law Assistant 🍁⚖️

A production-ready, AI-powered ChatGPT-style web application specialized in Canadian Personal Injury Law. Built with modern web technologies and integrated with OpenAI's GPT-5 API.

**Live Demo**: [Your deployed URL here]

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)

## 🚀 Features

### Core Functionality

- **ChatGPT-Style Interface** - Clean, modern chat interface with smooth animations
- **AI-Powered Responses** - Integrated with OpenAI GPT-5 for intelligent, contextual answers
- **Streaming Responses** - Real-time AI response streaming for better UX
- **Specialized Legal Knowledge** - Tailored system prompts for Canadian Personal Injury Law

### User Experience

- **Dark/Light Mode** - Full theme support with persistence
- **Markdown Rendering** - Rich text formatting with syntax highlighting for code blocks
- **Message Actions** - Copy messages and regenerate AI responses
- **Conversation History** - Save, load, and manage multiple conversations
- **Export Conversations** - Download conversation history as text files
- **Keyboard Shortcuts** - Speed up workflow with hotkeys (Ctrl+K, Ctrl+E, etc.)
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Professional Features

- **Legal Disclaimer** - Prominent legal disclaimer footer
- **Conversation Persistence** - Local storage of conversation history
- **User Avatars** - Visual distinction between user and AI messages
- **Typing Indicators** - Visual feedback during AI response generation
- **Error Handling** - Graceful error messages and retry mechanisms

## 🛠️ Tech Stack

### Frontend

- **React 18.3** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - High-quality component library
- **React Markdown** - Markdown rendering with syntax highlighting

### Backend

- **Supabase** - Backend-as-a-Service
- **Supabase Edge Functions** - Serverless API endpoints
- **OpenAI API** - GPT-5 integration

### Key Libraries

- `@radix-ui` - Accessible component primitives
- `react-query` - Data fetching and caching
- `lucide-react` - Beautiful icons
- `sonner` - Toast notifications
- `highlight.js` - Code syntax highlighting

## 📋 Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager
- Supabase account
- OpenAI API key

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <YOUR_GIT_URL>
cd law-gpt-buddy
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Configure Supabase Edge Function**

In your Supabase project, set the following secret:

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key
```

5. **Deploy Supabase Function**

```bash
supabase functions deploy chat
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Shortcut        | Action              |
| --------------- | ------------------- |
| `Ctrl/Cmd + K`  | New conversation    |
| `Ctrl/Cmd + E`  | Export conversation |
| `Enter`         | Send message        |
| `Shift + Enter` | New line in message |

## 🎨 Features Breakdown

### 1. Conversation Management

- **New Chat**: Start fresh conversations
- **Save Automatically**: Conversations saved to local storage
- **Load History**: Access previous conversations from sidebar
- **Delete Conversations**: Remove unwanted chat history
- **Export**: Download conversations as text files

### 2. Message Interactions

- **Copy Messages**: One-click copy to clipboard
- **Regenerate Responses**: Get alternative AI responses
- **Markdown Support**: Rich formatting including:
  - Headers, lists, and tables
  - Code blocks with syntax highlighting
  - Links and blockquotes
  - Inline code

### 3. Theme Support

- Light and dark mode
- Automatic theme persistence
- Smooth theme transitions
- Optimized color schemes for readability

### 4. Legal Specialization

The AI is specially configured with:

- Deep knowledge of Canadian Personal Injury Law
- Understanding of provincial variations
- Information about claims processes
- Compensation types and calculations
- Limitation periods and deadlines
- Legal representation guidance

## 📱 Responsive Design

The application is fully responsive and tested on:

- Desktop (1920x1080 and above)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667 and various screen sizes)

## 🔒 Security & Privacy

- **No Backend Storage**: Conversations stored locally in browser
- **API Key Security**: OpenAI API key stored securely in Supabase
- **CORS Protection**: Proper CORS headers configured
- **Legal Disclaimer**: Clear disclaimer about legal advice limitations

## 🎯 Production Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Environment Variables for Production

Make sure to set:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Legal Disclaimer

This application provides general information about Canadian personal injury law and should not be considered legal advice. Users should consult with qualified legal professionals for specific legal matters.

## 🐛 Troubleshooting

### Common Issues

**1. OpenAI API Errors**

- Verify your API key is set in Supabase secrets
- Check your OpenAI account has sufficient credits

**2. Build Errors**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Environment Variables Not Loading**

- Restart the dev server after changing .env
- Ensure variables start with `VITE_`

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review Supabase logs for backend issues
3. Open an issue on GitHub

## 🗺️ Roadmap

Future enhancements:

- [ ] User authentication
- [ ] Cloud storage for conversations
- [ ] Mobile app version
- [ ] Voice input support
- [ ] Multi-language support (French/English)
- [ ] Document upload and analysis
- [ ] Integration with legal databases

---

Built with ❤️ for Canadian Personal Injury Law
