import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const testProps = (testId: string): Record<string, string> => (
  {
    ...(process.env.APP_ENV !== "prod" && { "data-testid": testId }),
    "aria-label": testId
  }
);

export const mergeTestIds = (...args: string[]): string => args.join("_");

