import { isEmptyObject, isNonEmptyArray, isObject, isPresent } from "@sabo99/node-utils";
import { compose, withHandlers, withProps, withState } from "react-recompose";
import { connect } from "react-redux";

import withLoadingOverlay from "../withLoadingOverlay";
import withPreventRefresh from "../withPreventRefresh";
import type { Options } from "./withPage.type";

/**
 * Higher-order component (HOC) to enhance a React component with various options.
 *
 * @param {object} options - Configuration options for the HOC, The options object containing various configuration setting.
 * @param {object|null} options.props - (Optional) Additional props to be passed. Default is null.
 * @param {object|null} options.connect - (Optional) Manages state from React-Redux. Default is null.
 * @param {Array<Array<[string, string, any]>>|null} options.state - (Optional) Array of state options to manage state from React-recompose. Default is an empty array.
 * @param options.handlers - (Optional) Handlers for various events. Default is null.
 * @param options.preventRefresh - (Optional) Prevents page refresh. Default is null.
 * @param options.loadingOverlay - (Optional) Displays a loading overlay. Default is false.
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
//  *   preventRefresh: { someCondition: true },
 *   loadingOverlay: true
 * };
 *
 * const EnhancedComponent = withPage(options)(MyComponent);
 */
const withPage = (options: Options) => (Component: React.ComponentType<any>) => {
  const {
    props: propsOptions = null,
    connect: connectOptions = null,
    state: stateOptions = [],
    handlers: handlersOptions = null,
    preventRefresh: preventRefreshOptions = null, // Next feature will be implement
    loadingOverlay = false
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

  // ✅ 4. Handle prevent refresh
  if (preventRefreshOptions && !isEmptyObject(preventRefreshOptions)) {
    enhancers.push(withPreventRefresh(preventRefreshOptions));
  }

  // ✅ 5. Handle loading overlay
  if (loadingOverlay) {
    enhancers.push(withLoadingOverlay());
  }

  // ✅ 6. Handle handlers using React-recompose withHandlers
  if (isObject(handlersOptions)) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;