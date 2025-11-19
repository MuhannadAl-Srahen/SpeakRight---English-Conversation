<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SpeakRight - English Conversation & Accent Coach

An AI-powered English conversation practice app with real-time voice interaction and accent coaching using Google's Gemini AI.

## ✨ Features

- 🎤 **Real-time Voice Conversation**: Practice English with an AI coach using your microphone
- 🌍 **Virtual World Scenarios**: Practice in realistic situations (coffee shop, airport, restaurant, job interview, etc.)
- 📊 **Progress Tracking**: Monitor your learning journey with mood charts and training logs
- 🎯 **Accent Feedback**: Get specific pronunciation and accent tips during conversations
- 💬 **Dynamic Challenges**: Flexible conversation practice with general topics
- 📝 **Training History**: Review past conversations and track your improvement

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A modern web browser with microphone support
- Google Gemini API key

### Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone <your-repo-url>
   cd english-chat-bott
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure API Key**:

   - Copy `.env.example` to `.env.local`:

     ```bash
     cp .env.example .env.local
     ```

   - Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

   - Update `.env.local` with your API key:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:5173/`

6. **Allow Microphone Access**:
   When prompted, allow the browser to access your microphone for voice features to work.

## 🎮 How to Use

1. **Login**: Enter your name and select your gender to create your profile
2. **Choose an Activity**:
   - **Dynamic Challenges**: Have a free conversation with the AI coach
   - **Virtual World**: Select a specific scenario (coffee shop, airport, etc.)
3. **Start Talking**: Click the microphone button and start speaking in English
4. **Get Feedback**: The AI will respond and provide accent/pronunciation tips when needed
5. **Review Progress**: Check your Training Log to see past conversations and scores

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Progress visualization
- **Google Gemini AI** - AI conversation engine with native audio support
- **Web Audio API** - Real-time audio processing

## 📁 Project Structure

```
├── components/
│   ├── screens/                 # Main app screens
│   │   ├── HomeScreen.tsx       # Dashboard
│   │   ├── LoginScreen.tsx      # User login
│   │   ├── DynamicChallengeScreen.tsx # Voice conversation
│   │   ├── VirtualWorldScreen.tsx # Scenario selection
│   │   ├── TrainingLogScreen.tsx # History/progress
│   │   └── AvatarScreen.tsx     # Avatar selection
│   ├── chat/
│   │   └── ConversationDisplay.tsx # Chat messages
│   ├── ui/
│   │   ├── MicrophoneButton.tsx # Mic control
│   │   └── SessionStatus.tsx    # Status display
│   ├── layout/
│   │   └── Sidebar.tsx          # Navigation
│   └── index.ts                 # Component exports
├── config/
│   ├── aiConfig.ts              # AI system instructions
│   └── scenarioConfigs.ts       # Virtual world scenarios
├── hooks/
│   └── useAudioSession.ts       # Audio session logic
├── utils/
│   └── audioUtils.ts            # Audio processing
├── App.tsx                      # Main app
├── types.ts                     # TypeScript definitions
├── constants.ts                 # App constants
└── index.css                    # Global styles
```

See [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) and [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture documentation.

## 🔧 Troubleshooting

### Microphone not working

- Make sure you've allowed microphone access in your browser
- Check browser settings: Settings > Privacy > Microphone
- Try refreshing the page after granting permissions

### API Connection Issues

- Verify the API key is correct in `.env.local`
- Check your internet connection
- Make sure the environment variable name is `VITE_GEMINI_API_KEY`

### Build Errors

- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js v16 or higher
- Check that all dependencies are installed correctly

## 🎯 Tips for Best Results

- Speak clearly and at a normal pace
- Use headphones to prevent echo feedback
- Practice in a quiet environment
- Start with easier scenarios before moving to complex ones
- Review your training log regularly to track improvement

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Built with Google AI Studio
- Uses Google Gemini 2.0 Flash with native audio support
- Avatar images from avatar.iran.liara.run

---

**Note**: Never commit your `.env.local` file with real API keys to GitHub. Always use `.env.example` as a template.
