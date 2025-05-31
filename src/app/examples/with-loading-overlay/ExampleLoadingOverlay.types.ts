import type { ComposedDefaultPropsOptions, ComposedLoadingOverlayProps } from '@/types';

// ============================
// Interfaces
// ============================

interface HandleInput {
  delay: number;
}
interface CallbacksPayload {
  onBefore: () => void;
  onAfter: () => void;
}

export interface Props extends ComposedDefaultPropsOptions, ComposedLoadingOverlayProps {
  // Container
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  // Handlers
  onHandleSubmit: OnHandleCallback;
}

// ============================
// Callback Types
// ============================

export type OnHandleCallback = (
  values: HandleInput,
  callbacks: CallbacksPayload
) => Promise<void>;
