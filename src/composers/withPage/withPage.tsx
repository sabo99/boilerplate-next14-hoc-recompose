import { isEmptyObject, isNonEmptyArray } from '@sabo99/node-utils';
import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withAxiosApi from '../withAxiosApi';
import withLoadingOverlay from '../withLoadingOverlay';
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
 * @param {Object} options.uiSettings.sidebar - Sidebar settings.
 * @param {boolean} options.uiSettings.sidebar.enabledSidebar - Flag to enable sidebar.
 * @param {Object} options.uiSettings.overlay - Overlay settings.
 * @param {boolean} options.uiSettings.overlay.enabledOverlay - Flag to enable overlay.
 * @param {Object} options.uiSettings.preventRefresh - Prevent refresh settings.
 * @param {Object} options.handlers - Handlers to be added to the component.
 *
 * @description
 * This HOC enhances a React component with the following capabilities:
 * 1. Custom props using `withProps` from React-recompose.
 * 2. Redux connection using `connect`.
 * 3. State management using `withState` from React-recompose.
 * 4. API request handling using `withAxiosApi`.
 * 5. Sidebar functionality using `withSidebar`.
 * 6. Overlay functionality using `withOverlay` includes of `withLoadingOverlay` and `withIdlePopupOverlay`.
 * 7. Prevent refresh functionality using `withPreventRefresh`.
 * 8. Custom handlers using `withHandlers` from React-recompose.
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

  // ✅ 0. Handle default and required enhancers for the component uiSettingsOptions.screenConfig (screenName, pageTitle)
  // ✅ 1. Handle custom props using React-recompose withProps
  if (!isEmptyObject(propsOptions) && propsOptions) {
    enhancers.push(withProps(propsOptions));
  }

  // ✅ 2. Handle Redux connection
  if (!isEmptyObject(connectOptions) && connectOptions) {
    const { mapStateToProps = null, mapDispatchToProps = null } = connectOptions;
    enhancers.push(connect(mapStateToProps, mapDispatchToProps));
  }

  // ✅ 3. Handle state using React-recompose withState
  if (isNonEmptyArray(stateOptions)) {
    stateOptions.forEach((stateOption) => {
      enhancers.push(withState(...(stateOption as [string, string, any])));
    });
  }

  // ✅ 4. Handle uiSettings
  if (!isEmptyObject(uiSettingsOptions) && uiSettingsOptions) {
    const {
      sidebar: sidebarOptions = null,
      overlay: overlayOptions = null,
      preventRefresh: preventRefreshOptions = null
    } = uiSettingsOptions;

    // ✅ 4.1. Handle ui settings for sidebar
    if (!isEmptyObject(sidebarOptions) && sidebarOptions) {
      enhancers.push(withSidebar(sidebarOptions));
    }

    // ✅ 4.2. Handle ui settings for overlay
    if (!isEmptyObject(overlayOptions) && overlayOptions) {
      enhancers.push(withOverlay(overlayOptions));
    }

    // ✅ 4.3. Handle ui settings for prevent refresh
    if (!isEmptyObject(preventRefreshOptions) && preventRefreshOptions) {
      enhancers.push(withPreventRefresh(preventRefreshOptions));
    }
  }

  // ✅ 5. Handle API Request using withAxiosApi
  if (isNonEmptyArray(apiOptions) && apiOptions) {
    enhancers.push(withLoadingOverlay());

    apiOptions.forEach((apiOption) => {
      enhancers.push(withAxiosApi(apiOption));
    });
  }

  // ✅ 6. Handle handlers using React-recompose withHandlers
  if (!isEmptyObject(handlersOptions) && handlersOptions) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;