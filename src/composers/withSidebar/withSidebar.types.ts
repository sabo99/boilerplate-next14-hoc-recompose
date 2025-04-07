export type Props = {
  screenName: string;
  pageTitle: string;
  enabledSidebar: boolean; // from withSidebar HOC
  permissions: string[]; // Array of permissions to check RBAC
};