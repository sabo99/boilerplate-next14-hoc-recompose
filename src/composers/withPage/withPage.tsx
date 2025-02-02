import { compose, withHandlers, withProps } from "react-recompose";

import withLoadingOverlay from "../withLoadingOverlay";
import withPreventRefresh from "../withPreventRefresh";
import { Options } from "./withPage.type";

const withPage = (options: Options) => (Component: React.ComponentType<any>) => {
  const {
    // connect: connectOptions = null, // next feature to implement using redux
    // state: stateOptions = null, // next feature to implement using withState from react-recompose
    props: propsOptions = null,
    handlers: handlersOptions = null,
    preventRefresh: preventRefreshOptions = null,
    loadingOverlay = false
  } = options;

  const enhancers = [];

  if (propsOptions) {
    enhancers.push(withProps(propsOptions));
  }

  if (handlersOptions) {
    enhancers.push(withHandlers(handlersOptions));
  }

  if (preventRefreshOptions) {
    enhancers.push(withPreventRefresh(preventRefreshOptions));
  }

  if (loadingOverlay) {
    enhancers.push(withLoadingOverlay());
  }

  return compose(...enhancers)(Component);
};

export default withPage;