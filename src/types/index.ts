// ============================
// Type
// ============================
export type StorageType = 'local' | 'session';
export type WebStorageType = 'localStorage' | 'sessionStorage';
export type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type ComposedLoadingTypeOptions = 'SPINNER' | 'DOTS';
export type ComposedOverlayStateOptions = 'IDLE' | 'LOADING' | 'STEP_UP_VERIFICATION';
export type ComposedOverlayOptions =
  | ComposedIdlePopupOverlayOptions
  | ComposedLoadingOverlayOptions
  | ComposedStepUpVerificationOptions;
export type ComposedStepUpTypeOptions = 'PASSWORD' | 'PIN' | 'OTP';
export type AxiosApiRequestCallback = (args?: AxiosApiRequestArgs) => Promise<AxiosApiResponse>;
export type ButtonType = 'submit' | 'button' | 'reset';
export type ButtonVariant = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';

// ============================
// Components
// ============================

// AppDialog
export interface AppDialogButtonOptions {
  type: ButtonType;
  label: string;
  withCloseDialog?: boolean;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export interface AppDialogOption {
  title?: string | null;
  subtitle?: string | null;
  renderContent?: () => React.ReactNode;
  withoutFooter?: boolean;
  buttons?: AppDialogButtonOptions[];
}

// ============================
// Composers
// ============================

// withComposed
// ----------------------------
export interface ComposedOptions {
  withAuthEnabled?: boolean;
  props?: ComposedDefaultPropsOptions | object;
  connect?: ComposedConnectOptions;
  state?: ComposedStateOptions[];
  api?: ComposedAxiosApiLifecycleOptions;
  handlers?: object | any;
  uiSettings?: ComposedUiSettingOptions;
}

export interface ComposedDefaultPropsOptions {
  screenName: string;
  pageTitle: string;
  permissions: string[];
  params?: object;
  searchParams?: object;
}

export interface ComposedConnectOptions {
  mapStateToProps?: any;
  mapDispatchToProps?: any;
}

export type ComposedStateOptions = [string, string, any];

export interface ComposedUiSettingOptions {
  sidebar?: boolean;
  overlay?: ComposedOverlayOptions;
  preventRefresh?: any;
}

// withAuth
// ----------------------------
export interface ComposedAuthProps {
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

// withAxiosApi
// ----------------------------
export interface ComposedAxiosApiOptions {
  url: string;
  method: RequestMethod;
  mapProps: (instance: AxiosApiInstance) => object;
  options?: AxiosApiOptions;
}

// withAxiosApiLifecycle
// ----------------------------
export interface ComposedAxiosApiLifecycleOptions {
  loadingOverlay?: boolean;
  apiRequests: ComposedAxiosApiOptions[];
}

// withIdlePopupOverlay
// ----------------------------
export interface ComposedIdlePopupOverlayOptions {
  overlayState: 'IDLE';
}

export interface ComposedIdlePopupOverlayProps {
  isIdlePopupOverlay: boolean;
  setIdlePopupOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  idleTimeout: number;
  setIdleTimeout: React.Dispatch<React.SetStateAction<number>>;
  popupTimeout: number;
  setPopupTimeout: React.Dispatch<React.SetStateAction<number>>;
}

// withLoadingOverlay
// ----------------------------
export interface ComposedLoadingOverlayOptions {
  overlayState: 'LOADING';
  loaderType: ComposedLoadingTypeOptions;
}

export interface ComposedLoadingOverlayProps {
  setLoadingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingOverlay: boolean;
  loaderType: ComposedLoadingTypeOptions;
}

// withSidebar
// ----------------------------
export interface ComposedSidebarProps {
  enabledSidebar: boolean;
  setEnabledSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// withStepUpVerification
// ----------------------------
export interface ComposedStepUpVerification {
  isOpen: boolean;
  type: ComposedStepUpTypeOptions | null;
  appDialogOption?: AppDialogOption;
}

export interface ComposedStepUpVerificationOptions {
  overlayState: 'STEP_UP_VERIFICATION';
}

export interface ComposedStepUpVerificationProps {
  overlayState: 'STEP_UP_VERIFICATION';
  stepUpVerification: ComposedStepUpVerification;
  setStepUpVerification: React.Dispatch<React.SetStateAction<ComposedStepUpVerification>>;
}

// ============================
// AxiosAPI (Client)
// ============================
export interface AxiosApiInstance {
  request: AxiosApiRequest;
  response: AxiosApiResponse;
}

export interface AxiosApiOptions {
  skipApiOnRender?: boolean;
  baseURL?: string;
  headers?: object;
  params?: object;
}

export interface AxiosApiRequestArgs {
  payload?: Record<string, any>;
  apiOptions?: AxiosApiOptions;
}

export interface AxiosApiRequest {
  send: AxiosApiRequestCallback;
}

export interface AxiosApiError {
  statusCode?: number;
  message?: string;
  code?: string;
}

export interface AxiosApiResponse {
  loading: boolean;
  error?: AxiosApiError | null;
  data?: any;
}

// ============================
// Services
// ============================
export interface ApiCallOptions {
  url: string;
  method: RequestMethod;
  options: AxiosApiOptions;
}

export interface AuthServiceOptions {
  apiOptions: AxiosApiOptions;
}

export interface ProductServiceOptions {
  apiOptions: AxiosApiOptions;
}

// ============================
// Data Type
// ============================
export interface Account {
  sessionId?: string;
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  username: string;
  image: string;
}

export interface Session {
  isAuthenticated?: boolean;
  sessionId?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
}
