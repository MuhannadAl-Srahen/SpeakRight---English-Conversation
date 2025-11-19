# 📁 Project Structure

## Overview

The project has been refactored into a clean, modular architecture. Each file has a specific purpose, making debugging and maintenance much easier.

## Directory Structure

```
english-chat-bott/
├── components/              # UI Components
│   ├── DynamicChallengeScreen.tsx    # Main challenge screen (refactored)
│   ├── ConversationDisplay.tsx       # Chat message display
│   ├── MicrophoneButton.tsx          # Microphone UI controls
│   ├── SessionStatus.tsx             # Status message display
│   ├── HomeScreen.tsx                # Dashboard
│   ├── LoginScreen.tsx               # User login
│   ├── VirtualWorldScreen.tsx        # Scenario selection
│   ├── TrainingLogScreen.tsx         # History viewer
│   ├── Sidebar.tsx                   # Navigation
│   └── AvatarScreen.tsx              # Avatar selection
│
├── hooks/                   # Custom React Hooks
│   └── useAudioSession.ts            # Audio session management
│
├── utils/                   # Utility Functions
│   └── audioUtils.ts                 # Audio processing utilities
│
├── config/                  # Configuration
│   └── aiConfig.ts                   # AI system instructions & tools
│
├── App.tsx                  # Main app component
├── types.ts                 # TypeScript type definitions
├── constants.ts             # App constants & data
├── index.tsx                # App entry point
├── index.css                # Global styles
└── .env.local               # Environment variables
```

## File Descriptions

### 🎯 Components

#### **DynamicChallengeScreen.tsx** (Main)

- **Purpose**: Main conversation screen
- **What it does**: Orchestrates the conversation UI
- **Size**: ~100 lines (down from 430!)
- **Dependencies**: Uses hooks and sub-components

#### **ConversationDisplay.tsx**

- **Purpose**: Display chat messages
- **What it does**: Renders user and AI messages with feedback
- **Size**: ~40 lines
- **Features**: Auto-scroll, accent tips, encouragement display

#### **MicrophoneButton.tsx**

- **Purpose**: Microphone UI control
- **What it does**: Visual mic button with animations
- **Size**: ~60 lines
- **Features**: Mute/unmute, pulse animations, status indicators

#### **SessionStatus.tsx**

- **Purpose**: Display connection status
- **What it does**: Shows status messages based on connection state
- **Size**: ~30 lines
- **States**: Connecting, Connected, Error, Ended

### 🔧 Hooks

#### **useAudioSession.ts**

- **Purpose**: Manage entire audio session lifecycle
- **What it does**:
  - Connects to Gemini AI
  - Handles microphone input
  - Processes AI audio output
  - Manages transcriptions
  - Handles tool calls
- **Size**: ~200 lines
- **Benefits**: Reusable, testable, isolated logic

### 🛠️ Utils

#### **audioUtils.ts**

- **Purpose**: Audio processing utilities
- **What it does**:
  - Encode/decode audio data
  - Create PCM audio blobs
  - Decode audio buffers
- **Size**: ~50 lines
- **Pure functions**: No side effects, easy to test

### ⚙️ Config

#### **aiConfig.ts**

- **Purpose**: AI configuration and instructions
- **What it does**:
  - System instruction templates
  - Function declarations for tools
  - Scenario-specific instructions
- **Size**: ~60 lines
- **Easy to modify**: Change AI behavior in one place

## Benefits of New Structure

### ✅ **Before** (Old Structure)

- ❌ 430 lines in one file
- ❌ Hard to find bugs
- ❌ Difficult to modify
- ❌ Everything mixed together
- ❌ Hard to test

### ✅ **After** (New Structure)

- ✅ Separated into 10 focused files
- ✅ Each file < 200 lines
- ✅ Clear responsibilities
- ✅ Easy to debug
- ✅ Easy to test
- ✅ Reusable components
- ✅ Better organization

## How to Debug Issues

### 🎤 **Microphone Problems**

→ Check: `hooks/useAudioSession.ts` (lines 20-30)

### 🔊 **Audio Output Issues**

→ Check: `utils/audioUtils.ts` or `hooks/useAudioSession.ts` (lines 80-110)

### 💬 **AI Not Responding**

→ Check: `config/aiConfig.ts` (system instructions)

### 🖼️ **UI Display Problems**

→ Check: `components/ConversationDisplay.tsx` or `components/MicrophoneButton.tsx`

### 🌍 **Virtual World Scenarios**

→ Check: `constants.ts` (VIRTUAL_WORLD_LOCATIONS)

## Component Relationships

```
DynamicChallengeScreen (Main)
│
├── useAudioSession (Hook)
│   ├── audioUtils (Utils)
│   └── aiConfig (Config)
│
├── ConversationDisplay
├── MicrophoneButton
└── SessionStatus
```

## Making Changes

### To modify AI behavior:

1. Edit `config/aiConfig.ts`
2. Change system instructions or function declarations

### To change UI:

1. Edit component files in `components/`
2. Each component is self-contained

### To fix audio issues:

1. Check `utils/audioUtils.ts` for processing
2. Check `hooks/useAudioSession.ts` for session logic

### To add new scenarios:

1. Edit `constants.ts`
2. Add to `VIRTUAL_WORLD_LOCATIONS` array

## Testing Individual Parts

Each module can now be tested independently:

```typescript
// Test audio utils
import { encode, decode } from './utils/audioUtils'

// Test AI config
import { getGeneralSystemInstruction } from './config/aiConfig'

// Test components
import { MicrophoneButton } from './components/MicrophoneButton'
```

## Old File Backup

The original 430-line file is backed up as:
`components/DynamicChallengeScreen.old.tsx`

You can restore it anytime if needed!

## Summary

🎉 **Project is now much cleaner and easier to work with!**

- Each file has one clear purpose
- Easy to find and fix problems
- Better code organization
- Scalable for future features
- Much easier to understand and maintain
