import { isEmptyObject, isNonEmptyArray, isObject, isPresent } from "@sabo99/node-utils";
import { compose, withHandlers, withProps, withState } from "react-recompose";
import { connect } from "react-redux";

import withLoadingOverlay from "../withLoadingOverlay";
import withPreventRefresh from "../withPreventRefresh";
import type { Options } from "./withPage.type";

/**
 * Extracts and assigns default values to various options for the withPage HOC.
 *
 * @param options - The options object containing various configuration settings.
 * @param options.props - (Optional) Additional props to be passed. Default is null.
 * @param options.connect - (Optional) Manages state from React-Redux. Default is null.
 * @param options.state - (Optional) Array of state options to manage state from React-recompose. Default is an empty array.
 * @param options.handlers - (Optional) Handlers for various events. Default is null.
 * @param options.preventRefresh - (Optional) Prevents page refresh. Default is null.
 * @param options.loadingOverlay - (Optional) Displays a loading overlay. Default is false.
 */
const withPage = (options: Options) => (Component: React.ComponentType<any>) => {
  const {
    props: propsOptions = null,
    connect: connectOptions = null,
    state: stateOptions = [],
    handlers: handlersOptions = null,
    preventRefresh: preventRefreshOptions = null,
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

  // ✅ 4. Handle handlers using React-recompose withHandlers
  if (isObject(handlersOptions)) {
    enhancers.push(withHandlers(handlersOptions));
  }

  // ✅ 5. Handle prevent refresh
  if (preventRefreshOptions && !isEmptyObject(preventRefreshOptions)) {
    enhancers.push(withPreventRefresh(preventRefreshOptions));
  }

  // ✅ 6. Handle loading overlay
  if (loadingOverlay) {
    enhancers.push(withLoadingOverlay());
  }

  return compose(...enhancers)(Component);
};

export default withPage;