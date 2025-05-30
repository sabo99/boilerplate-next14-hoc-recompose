const Constants =
{
  Permissions: [
    'VIEW_DASHBOARD',
    'VIEW_ALERT_DIALOG',
    'VIEW_LOADING_OVERLAY',
    'VIEW_IDLE_OVERLAY',
    'VIEW_PREVENT_REFRESH',
    'VIEW_AUTHENTICATION',
    'VIEW_DATA_FETCHING',
    'VIEW_STEP_UP_VERIFICATION'
  ],
  Paths: {
    Root: '/',
    Dashboard: '/dashboard',
    Examples: {
      WithLoadingOverlay: '/examples/with-loading-overlay',
      WithIdleOverlay: '/examples/with-idle-overlay',
      WithAuthentication: '/examples/with-authentication',
      WithDataFetching: '/examples/with-data-fetching',
      WithStepUpVerification: '/examples/with-step-up-verification'
    }
  },
  ErrorCode: {
    BadRequest: 'BAD_REQUEST',
    Unauthorized: 'UNAUTHORIZED',
    Forbidden: 'FORBIDDEN',
    NotFound: 'NOT_FOUND',
    InternalServerError: 'INTERNAL_SERVER_ERROR',
    TokenExpired: 'TOKEN_EXPIRED',
    ConnectionRefused: 'ECONNREFUSED',
    ConnectionReset: 'ECONNRESET'
  }
};

export default Constants;