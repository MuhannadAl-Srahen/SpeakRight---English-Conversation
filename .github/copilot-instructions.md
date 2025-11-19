# AI Coding Agent Instructions - SpeakRight

## Project Overview

Real-time English conversation practice app using **Google Gemini 2.5 Flash Native Audio** for voice-to-voice AI conversations with accent coaching. Single-page React app with persistent audio streaming.

## Critical Architecture Patterns

### Audio Session Lifecycle (Core Pattern)

The app uses **persistent bidirectional audio streaming** via `@google/genai` Live API (NOT REST):

- `useAudioSession.ts` manages the entire WebRTC-like connection lifecycle
- Input: MediaStream → ScriptProcessor → PCM encoding → Gemini Live API
- Output: Base64 audio → PCM decoding → Web Audio API playback
- **Never disconnect mid-conversation** - session stays open until user ends it

### State Management Pattern

**Ref-based audio state + useState for UI**:

```typescript
// Audio state uses refs to avoid re-renders during streaming
const isMutedRef = useRef(false)
const currentInputTranscriptionRef = useRef('')

// UI state uses useState
const [conversation, setConversation] = useState<Message[]>([])
```

This prevents audio glitches from React re-renders. Always use refs for real-time audio state.

### Dual-Mode AI Behavior

Two distinct conversation modes with different system instructions:

1. **General Mode** (`context === null`): Free-form conversation with `provideAccentFeedback` tool
2. **Virtual World Mode** (`isVirtualWorld === true`): Scenario-based roleplay (see `config/scenarioConfigs.ts`)

System instructions are in `config/aiConfig.ts` - modify AI behavior there, not in components.

### Message Flow & Tool Calls

Messages accumulate across multiple turn completions:

- Transcriptions stream in chunks (`inputTranscription`/`outputTranscription`)
- Tool calls arrive before `turnComplete`
- Pending feedback stored in refs, attached to next AI message on `turnComplete`
- **Never manually construct messages** - always wait for `turnComplete` event

## Component Organization

### Screen Components (`components/screens/`)

Full-page views (HomeScreen, LoginScreen, DynamicChallengeScreen, etc.). Each screen is a distinct navigation destination controlled by `App.tsx` screen state.

### Centralized Exports (`components/index.ts`)

ALL components export through `components/index.ts` for clean imports:

```typescript
import { HomeScreen, Sidebar, MicrophoneButton } from './components'
```

**Always update `components/index.ts` when adding new components.**

### UI Component Responsibilities

- `MicrophoneButton.tsx`: Visual control only (no audio logic)
- `SessionStatus.tsx`: Status display (connecting/connected/error states)
- `ConversationDisplay.tsx`: Message rendering with auto-scroll

## Development Workflows

### Running the App

```bash
npm run dev  # Vite dev server on localhost:5173
```

**Microphone permissions required** - browser will prompt on first use.

### Environment Setup

API key required in `.env.local`:

```
VITE_GEMINI_API_KEY=your_key_here
```

Access via `import.meta.env.VITE_GEMINI_API_KEY` (Vite convention).

### Building for ProductionAirport Scenario - Practice checking in for flights, going through security, asking about gates and boarding times, handling luggage questions, and understanding airport announcements

```bash
npm run build   # Outputs to dist/
npm run preview # Preview production build
```

## Key Configuration Files

### `constants.ts` - App Data

- `AVATARS`: User avatar options (gender-filtered)
- `VIRTUAL_WORLD_LOCATIONS`: All scenario definitions
- `INITIAL_PROGRESS_DATA`: Mock mood chart data

### `types.ts` - TypeScript Contracts

Defines all interfaces. Key types:

- `Message`: Has optional `accentFeedback`, `encouragement`, `promptToRead`
- `TrainingLog`: Persisted conversation with score
- `Screen`: Type-safe navigation values

### `config/scenarioConfigs.ts` - Scenario System

Defines detailed system instructions for each Virtual World scenario (Coffee Shop, Airport, Restaurant, etc.). Each has vocabulary, example phrases, and roleplay instructions.

## Common Gotchas

### Audio Buffer Management

`outputSources` Set tracks all playing audio sources. Must clean up on interruptions:

```typescript
if (message.serverContent?.interrupted) {
  for (const source of outputSources.values()) {
    source.stop()
    outputSources.delete(source)
  }
}
```

### Mute Implementation

Mute works by **skipping `sendRealtimeInput()`**, not by stopping the microphone:

```typescript
if (isMutedRef.current) return // In scriptProcessor.onaudioprocess
```

### Session Cleanup

Always clean up in useEffect return:

- Close Live API session
- Stop MediaStream tracks
- Disconnect AudioNodes
- Close AudioContexts

### Path Aliases

`tsconfig.json` defines `@/*` alias for root imports, but Vite doesn't use it by default (no vite.config). Use relative imports: `'../utils/audioUtils'`.

## Testing Strategy

### Audio Session Testing

Test `useAudioSession` in isolation - mock Google GenAI client. Key scenarios:

- Microphone permission denied
- Network interruption during session
- Tool call handling (feedback attachment)

### Component Testing

UI components are pure - test with mock props. Focus on:

- Mute button toggle behavior
- Message display with/without feedback
- Auto-scroll on new messages

## External Dependencies

### Google Gemini AI

- Model: `gemini-2.5-flash-native-audio-preview-09-2025`
- Voice: `Zephyr` (prebuilt voice config)
- Modalities: Audio-only output, text transcriptions available
- See `@google/genai` docs for Live API changes

### Audio Processing

Uses native Web Audio API:

- Input: 16kHz sample rate (microphone)
- Output: 24kHz sample rate (AI voice)
- Format: PCM 16-bit mono

### Charts

`recharts` for mood progress visualization (HomeScreen only).

## Modifying AI Behavior

### Adding New Scenarios

1. Add to `VIRTUAL_WORLD_LOCATIONS` in `constants.ts`
2. Create config in `SCENARIO_CONFIGS` in `config/scenarioConfigs.ts`
3. Include system instruction, vocabulary, example phrases

### Changing AI Personality

Edit `getGeneralSystemInstruction()` or scenario-specific instructions in `config/aiConfig.ts`. Changes take effect on next session start.

### Adding New Tool Calls

1. Define FunctionDeclaration in `config/aiConfig.ts`
2. Handle in `useAudioSession.ts` onmessage → `message.toolCall`
3. Send response via `session.sendToolResponse()`
4. Attach results to Message object on `turnComplete`

## Project-Specific Conventions

- **No class components** - all functional with hooks
- **No context API** - prop drilling from App.tsx (simple state tree)
- **No external state management** - useState + useRef sufficient
- **Tailwind utility classes** - no separate CSS modules
- **No tests currently** - focus on working implementation first
- **Screen navigation** - string literals, not React Router (single-page with conditional rendering)
