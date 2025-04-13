export type Account = {
  sessionId?: string;
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  username: string;
  image: string;
  // password: string;
}

export type Props = {
  screenName: string;
  user?: Account
  icon?: React.ReactNode;
  avatarFallback?: React.ReactNode;
}