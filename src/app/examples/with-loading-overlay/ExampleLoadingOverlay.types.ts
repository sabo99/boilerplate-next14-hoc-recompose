type HandleInput = {
  message: string;
  delay: number;
}

type CallbacksPayload = {
  onBefore: () => void;
  onAfter: () => void;
}

export type OnHandleCallback = (
  values: HandleInput,
  callbacks: CallbacksPayload
) => void;

export type Props = {
  params?: object;
  searchParams?: object;
  messages: string[];
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoadingOverlay: boolean;
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  onHandleSubmit: OnHandleCallback;
}
