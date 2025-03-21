import { DefaultPropsOptions } from '@/composers/withPage/withPage.types';

type HandleInput = {
  delay: number;
}

type CallbacksPayload = {
  onBefore: () => void;
  onAfter: () => void;
}

export type OnHandleCallback = (
  values: HandleInput,
  callbacks: CallbacksPayload
) => Promise<void>;

export type Props = {
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoadingOverlay: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleSubmit: OnHandleCallback;
} & DefaultPropsOptions
