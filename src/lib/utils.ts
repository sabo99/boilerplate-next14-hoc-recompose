import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function testProps(testId: string) {
  return {
    "data-testid": testId,
    "aria-label": testId
  };
};

export function mergeTestIds(...args: string[]) {
  return args.join("_");
}

