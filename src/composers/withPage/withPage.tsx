import { isEmptyObject, isNonEmptyArray } from '@sabo99/node-utils';
import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

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
 * @param {Object} options.uiSettings - UI settings options.
 * @param {Object} options.uiSettings.sidebar - Sidebar settings.
 * @param {boolean} options.uiSettings.sidebar.enabledSidebar - Flag to enable sidebar.
 * @param {Object} options.uiSettings.loadingOverlay - Loading overlay settings.
 * @param {boolean} options.uiSettings.loadingOverlay.enabledLoadingOverlay - Flag to enable loading overlay.
 * @param {Object} options.uiSettings.preventRefresh - Prevent refresh settings.
 * @param {Object} options.handlers - Handlers to be added to the component.
 *
 * @description
 * This HOC enhances a React component with the following capabilities:
 * 1. Custom props using `withProps` from React-recompose.
 * 2. Redux connection using `connect`.
 * 3. State management using `withState` from React-recompose.
 * 4. Screen configuration using `withProps`.
 * 5. Sidebar functionality using `withSidebar`.
 * 6. Loading overlay functionality using `withLoadingOverlay`.
 * 7. Prevent refresh functionality using `withPreventRefresh`.
 * 8. Custom handlers using `withHandlers` from React-recompose.
 *
 * The last `enhancers.push` call adds the `withHandlers` enhancer to the list of enhancers if `handlersOptions` is provided and is an object.
 * This allows the component to handle custom event handlers defined in the `handlersOptions`.
 *
 * @example
 * const options = {
 *   props: { screenName: 'Home', pageTitle: 'Home Page', permissions: ['VIEW_MENU']  },
 *   connect: { mapStateToProps, mapDispatchToProps },
 *   state: [['stateName', 'setStateName', initialState]],
 *   handlers: { handleClick: () => {} },
 *   uiSettings: {
 *     sidebar: { isFilteredByPermission: true },
 *     overlay: { overlayState: 'LOADING', loaderType: 'DOTS' },
//  *     preventRefresh: { someCondition: true }
 *   }
 * };
 *
 * const EnhancedComponent = withPage(options)(MyComponent);
 */
const withPage = (options: Options) => (Component: React.ComponentType<any>) => {
  const {
    props: propsOptions = null,
    connect: connectOptions = null,
    state: stateOptions = [],
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
      // loadingOverlay: loadingOverlayOptions = null,
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

  // ✅ 5. Handle handlers using React-recompose withHandlers
  if (!isEmptyObject(handlersOptions) && handlersOptions) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;