import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes dynamically.
 *
 * @param {...ClassValue[]} inputs - List of class names or conditions.
 * @returns {string} - A merged string of class names.
 *
 * @example
 * ```tsx
 * <div className={cn('p-4', isActive && 'bg-blue-500')} />
 * ```
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Joins an array of strings using a specified separator.
 *
 * @param {string[]} args - The array of strings to join.
 * @param {string} [separator='-'] - The separator to use (default is "-").
 * @returns {string} - A single concatenated string.
 *
 * @example
 * ```tsx
 * const result = joinWith (['apple', 'banana', 'cherry']); // "apple-banana-cherry"
 * const customResult = joinWith (['one', 'two', 'three'], '/'); // "one/two/three"
 * ```
 */
export const joinWith = (args: string[], separator: string = '-'): string => args.join(separator);

/**
 * Extracts the initials from a given string.
 *
 * @param value - The input string from which to extract initials.
 * @returns A string containing the initials of the input string.
 *
 * @example
 * ```typescript
 * getInitials("John Doe"); // Returns "JD"
 * getInitials("Alice"); // Returns "A"
 * getInitials("Bob Marley"); // Returns "BM"
 * ```
 */
export const getInitials = (value: string): string => {
  const words = value.trim().split(/\s+/); // Split by spaces and remove extra spaces

  if (words.length === 1) {
    return words[0][0].toUpperCase(); // Return first letter
  }

  return words
    .slice(0, 2) // Take only the first two words
    .map(word => word[0].toUpperCase()) // Get the first letter of each word
    .join(''); // Join them together
};
