import { cn } from "@/lib/utils";

export const DotContainer = (
  className?: string
) => cn('inline-block rounded-full', className);

export const DotStyle = (dotSize: string, margin: string) => ({
  width: dotSize,
  height: dotSize,
  margin: `0 ${margin}`
});