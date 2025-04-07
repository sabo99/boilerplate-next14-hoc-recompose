export type Props = {
  isAuthenticated?: boolean;
  sessionId?: string,
  accessToken?: string,
  refreshToken?: string,
  userInfo?: object,
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRefreshToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUserInfo: React.Dispatch<React.SetStateAction<object | undefined>>;
  clearAuthState: () => void;
}