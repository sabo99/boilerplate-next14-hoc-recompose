import { generateRandomString } from '@sabo99/node-utils';

import accountsJson from '../../data/accounts.json';

const mapAccounts = accountsJson.map((account) => ({
  ...account,
  sessionId: generateRandomString(12)
}));

const accounts = mapAccounts;

export {
  accounts
};