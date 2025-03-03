export type Props = {
  screenName: string;
  pageTitle: string;
  permissions: string[]; // Array of permissions to check RBAC
} & Options;

export type Options = {
  isFilteredByPermission: boolean;
}
