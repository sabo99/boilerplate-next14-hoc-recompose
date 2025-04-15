import { Account } from '@/components/AppComponents/AccountInfo/AccountInfo.types';

export type Props = {
  session: Session;
  activeAccount?: Account;
  accounts?: Account[];
  selectedRelogAccount?: Account;
  setSession: React.Dispatch<React.SetStateAction<Session>>;
  setActiveAccount: React.Dispatch<React.SetStateAction<Account>>;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  clearSession: () => void;
  clearAllSession: () => void;
  setSelectedRelogAccount: React.Dispatch<React.SetStateAction<Account>>;
  clearSelectedRelogAccount: () => void;
}

type Session = {
  isAuthenticated?: boolean;
  sessionId?: string;
  accessToken?: string;
  refreshToken?: string;
}