import Config from '@/config';
import { joinWith } from '@/lib/utils';

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
  ...(Config.env !== 'prod' && { 'data-testid': testId }),
  'aria-label': testId
});

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