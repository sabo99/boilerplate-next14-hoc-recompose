const Constants =
{
  Permissions: [
    'VIEW_DASHBOARD',
    'VIEW_ALERT_DIALOG',
    'VIEW_LOADING_OVERLAY',
    'VIEW_IDLE_OVERLAY',
    'VIEW_PREVENT_REFRESH',
    'VIEW_DATA_FETCHING'
  ],
  Paths: {
    Dashboard: '/dashboard',
    Examples: {
      WithLoadingOverlay: '/examples/with-loading-overlay',
      WithIdleOverlay: '/examples/with-idle-overlay',
      WithDataFetching: '/examples/with-data-fetching'
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