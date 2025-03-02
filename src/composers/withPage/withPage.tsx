import { isEmptyObject, isNonEmptyArray, isObject, isPresent } from '@sabo99/node-utils';
import { compose, withHandlers, withProps, withState } from 'react-recompose';
import { connect } from 'react-redux';

import withLoadingOverlay from '../withLoadingOverlay';
import withPreventRefresh from '../withPreventRefresh';
import type { Options } from './withPage.types';

/**
 * Higher-order component (HOC) that enhances a given component with various options.
 *
 * @param {Options} options - Configuration options for the HOC.
 * @param {Object} options.props - Custom props to be added to the component.
 * @param {Object} options.connect - Redux connection options.
 * @param {Object} options.connect.mapStateToProps - Function to map state to props.
 * @param {Object} options.connect.mapDispatchToProps - Function to map dispatch to props.
 * @param {Array} options.state - State options for the component.
 * @param {Object} options.uiSettings - UI settings options.
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
 * 4. Prevent refresh functionality using `withPreventRefresh`.
 * 5. Loading overlay functionality using `withLoadingOverlay`.
 * 6. Custom handlers using `withHandlers` from React-recompose.
 *
 * The last `enhancers.push` call adds the `withHandlers` enhancer to the list of enhancers if `handlersOptions` is provided and is an object. This allows the component to handle custom event handlers defined in the `handlersOptions`.
 *
 * @example
 * const options = {
 *   props: { someProp: 'value' },
 *   connect: { mapStateToProps, mapDispatchToProps },
 *   state: [['stateName', 'setStateName', initialState]],
 *   handlers: { handleClick: () => {} },
 *   uiSettings: {
 *     loadingOverlay: { enabledLoadingOverlay: true },
 *     preventRefresh: { someCondition: true }
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

  // ✅ 1. Handle custom props using React-recompose withProps
  if (isPresent(propsOptions)) {
    enhancers.push(withProps(propsOptions));
  }

  // ✅ 2. Handle Redux connection
  if (!isEmptyObject(connectOptions) && connectOptions !== null) {
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
  if (isObject(uiSettingsOptions) && uiSettingsOptions) {
    const { loadingOverlay = null, preventRefresh = null } = uiSettingsOptions;

    // ✅ 4.1. Handle loading overlay
    if (loadingOverlay && loadingOverlay.enabledLoadingOverlay) {
      enhancers.push(withLoadingOverlay(loadingOverlay));
    }

    // ✅ 4.2. Handle prevent refresh
    if (preventRefresh) {
      enhancers.push(withPreventRefresh(preventRefresh));
    }
  }

  // ✅ 5. Handle handlers using React-recompose withHandlers
  if (isObject(handlersOptions)) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;