import { isEmptyObject, isNonEmptyArray } from '@sabo99/node-utils';
import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withAuth from '../withAuth/withAuth';
import withAxiosApiLifecycle from '../withAxiosApiLifecycle';
import withOverlay from '../withOverlay';
import withPreventRefresh from '../withPreventRefresh';
import withSidebar from '../withSidebar';
import type { Options } from './withPage.types';

/**
 * Higher-order component (HOC) that enhances a given component with various options.
 *
 * @param {Options} options - Configuration options for the HOC.
 * @param {Object} options.props - Custom props to be added to the component.
 * @param {Object} options.connect - Redux connection options.
 * @param {Function} options.connect.mapStateToProps - Function to map state to props.
 * @param {Function} options.connect.mapDispatchToProps - Function to map dispatch to props.
 * @param {Array} options.state - State options for the component.
 * @param {Object} options.api - API request options.
 * @param {Object} options.uiSettings - UI settings options.
 * @param {Object} options.uiSettings.sidebar - Flag to enable sidebar.
 * @param {Object} options.uiSettings.overlay - Overlay settings.
 * @param {Object} options.uiSettings.preventRefresh - Prevent refresh settings.
 * @param {Object} options.handlers - Handlers to be added to the component.
 *
  * @description
 * This Higher-Order Component (HOC) enhances a React component with multiple capabilities:
 *
 * 1. Authentication Handling:
 *    - Injects authentication-related props using `withAuth`.
 *
 * 2. Custom Props Injection:
 *    - Uses `withProps` from `react-recompose` to provide additional custom props.
 *
 * 3. Redux Integration:
 *    - Connects the component to the Redux store using `connect`.
 *
 * 4. Local State Management:
 *    - Manages local component state using `withState` from `react-recompose`.
 *
 * 5. UI Settings Support:
 *    - Accepts `uiSettingsOptions` prop to enable UI behaviors such as:
 *      - `withSidebar` → Displays sidebar
 *      - `withOverlay` → Displays overlay
 *      - `withPreventRefresh` → Prevents page refresh
 *
 * 6. API Request Handling:
 *    - Handles Axios API calls using `withAxiosApiLifecycle`.
 *
 * 7. Business Logic Handling:
 *    - Injects custom logic/handlers using `withHandlers` from `react-recompose`.
 *
 * The `enhancers` array dynamically builds a list of HOCs based on the provided options.
 * Each enhancer is conditionally added to the array, ensuring flexibility and modularity.
 *
 * @example
 * const options = {
 *   props: { screenName: 'Home', pageTitle: 'Home Page', permissions: ['VIEW_MENU'] },
 *   connect: { mapStateToProps, mapDispatchToProps },
 *   state: [['stateName', 'setStateName', initialState]],
 *   api: { url: '/users', method: 'GET' },
 *   handlers: { handleClick: () => {} },
 *   uiSettings: {
 *     sidebar: { isFilteredByPermission: true },
 *     overlay: { overlayState: 'LOADING', loaderType: 'DOTS' },
 *     preventRefresh: { someCondition: true }
 *   },
 * };
 *
 * const EnhancedComponent = withPage(options)(MyComponent);
 */
const withPage = (options: Options) => (Component: React.ComponentType<any>) => {
  const {
    props: propsOptions = null,
    connect: connectOptions = null,
    state: stateOptions = [],
    api: apiOptions = null,
    uiSettings: uiSettingsOptions = null,
    handlers: handlersOptions = null
  } = options;
  const enhancers = [];

  // ✅ 1. Add authentication enhancer using withAuth
  enhancers.push(withAuth());

  // ✅ 2. Handle default and required enhancers for the component uiSettingsOptions.screenConfig (screenName, pageTitle)
  if (!isEmptyObject(propsOptions) && propsOptions) {
    enhancers.push(withProps(propsOptions));
  }

  // ✅ 3. Handle Redux connection
  if (!isEmptyObject(connectOptions) && connectOptions) {
    const { mapStateToProps = null, mapDispatchToProps = null } = connectOptions;
    enhancers.push(connect(mapStateToProps, mapDispatchToProps));
  }

  // ✅ 4. Handle state using React-recompose withState
  if (isNonEmptyArray(stateOptions)) {
    stateOptions.forEach((stateOption) => {
      enhancers.push(withState(...(stateOption as [string, string, any])));
    });
  }

  // ✅ 5. Handle uiSettings
  if (!isEmptyObject(uiSettingsOptions) && uiSettingsOptions) {
    const {
      sidebar = false,
      overlay: overlayOptions = null,
      preventRefresh: preventRefreshOptions = null
    } = uiSettingsOptions;

    // ✅ 5.1. Handle ui settings for sidebar
    if (sidebar) {
      enhancers.push(withSidebar());
    }

    // ✅ 5.2. Handle ui settings for overlay
    if (!isEmptyObject(overlayOptions) && overlayOptions) {
      enhancers.push(withOverlay(overlayOptions));
    }

    // ✅ 5.3. Handle ui settings for prevent refresh
    if (!isEmptyObject(preventRefreshOptions) && preventRefreshOptions) {
      enhancers.push(withPreventRefresh(preventRefreshOptions));
    }
  }

  // ✅ 6. Handle API Request using withAxiosApi
  if (isNonEmptyArray(apiOptions) && apiOptions) {
    const axiosApiLifecyleOptions = { apiOptions, loadingOverlay: true };
    enhancers.push(withAxiosApiLifecycle(axiosApiLifecyleOptions));
  }

  // ✅ 7. Handle handlers using React-recompose withHandlers
  if (!isEmptyObject(handlersOptions) && handlersOptions) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;