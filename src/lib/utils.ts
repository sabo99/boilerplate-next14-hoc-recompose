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
 * Generates test props for components.
 * - Adds `data-testid` attribute in non-production environments.
 * - Always includes `aria-label` for accessibility.
 *
 * @param {string} testId - The test identifier.
 * @returns {Record<string, string>} - Object containing test props.
 *
 * @example
 * ```tsx
 * <button {...testProps('submit-button')}>Submit</button>
 * ```
 */
export const testProps = (testId: string): Record<string, string> => ({
  ...(process.env.APP_ENV !== 'prod' && { 'data-testid': testId }),
  'aria-label': testId
});

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
 * Generates a structured test ID by joining multiple strings with an underscore.
 *
 * @param {...string[]} args - Parts of the test ID.
 * @returns {string} - Concatenated test ID.
 *
 * @example
 * ```tsx
 * const inputTestId = tid('login', 'username', 'input'); // "login_username_input"
 * ```
 */
export const tid = (...args: string[]): string => joinWith(args, '_');
