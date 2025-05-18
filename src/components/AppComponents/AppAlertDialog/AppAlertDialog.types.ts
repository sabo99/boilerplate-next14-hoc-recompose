export type Props = {
  screenName: string;
} & Options

type ButtonOption = {
  onClick: () => void;
  text?: string
}

type BaseOptions = {
  isOpen?: boolean;
  title?: string;
  message?: string | React.ReactNode;
};

type WithFooter = BaseOptions & {
  withoutFooter?: never;
  confirmButton: ButtonOption;
  cancelButton: ButtonOption;
};

type WithoutFooter = BaseOptions & {
  withoutFooter: true;
  confirmButton?: never;
  cancelButton?: never;
};

export type Options = WithFooter | WithoutFooter;
