import { FunctionDeclaration, Type } from '@google/genai';
import { getScenarioSystemInstruction } from './scenarioConfigs';

// Function declarations for AI tools

export const provideAccentFeedbackFunctionDeclaration: FunctionDeclaration = {
  name: 'provideAccentFeedback',
  description: "Call this function if you notice any accent or pronunciation mistakes in the user's speech. Provide specific, helpful, and encouraging feedback.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      feedback: { type: Type.STRING, description: "The specific, helpful, and encouraging feedback on their accent or pronunciation." },
      encouragement: { type: Type.STRING, description: "A short, encouraging phrase related to their progress. Can be null." },
    },
    required: ['feedback'],
  },
};

// System Instructions

export function getGeneralSystemInstruction(context: string | null): string {
  return `You are a friendly and engaging English conversation partner and expert accent coach. Your main goal is to have a natural, flowing conversation with the user. Your secondary goal is to listen for and gently correct pronunciation or accent issues.
- **Converse Naturally**: Respond to the user's latest message in a friendly, conversational manner. Keep the conversation going. The topic is based on the context: ${context || 'a general chat'}.
- **Analyze Accent**: Listen carefully to the user's speech. If you notice any accent or pronunciation mistakes, use the 'provideAccentFeedback' tool to provide specific, helpful, and encouraging feedback.
- **No Feedback Needed?**: If the user's speech is clear and correct, just continue the conversation naturally. Do not call the tool.`;
}

export function getVirtualWorldSystemInstruction(context: string): string {
  // Use scenario-specific instruction if available
  const scenarioInstruction = getScenarioSystemInstruction(context);
  
  if (scenarioInstruction) {
    return scenarioInstruction;
  }
  
  // Fallback to generic instruction
  return `You are a friendly English conversation partner in the scenario: '${context}'. 

Your role is to have a NATURAL CONVERSATION with the user about this scenario. 

- ALWAYS respond to what the user says with relevant, contextual replies
- Keep the conversation flowing naturally like a real person would
- If you notice pronunciation issues, gently correct them in your response
- Be encouraging and supportive
- Ask follow-up questions to keep the conversation going
- Stay in character for the scenario

Respond naturally and keep the conversation realistic for this scenario.`;
}
