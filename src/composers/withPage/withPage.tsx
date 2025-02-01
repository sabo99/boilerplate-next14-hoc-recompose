/* eslint-disable @typescript-eslint/no-explicit-any */
import { compose, withHandlers, withProps } from "react-recompose";

import { Options } from "./withPage.type";

const withPage = (options: Options) => (Component: any) => {
  const {
    // connect: connectOptions = null,
    props: propsOptions = null,
    handlers: handlersOptions = null
    // preventRefresh: preventRefreshOptions = null,
    // loadingOverlay = false,
  } = options;

  const enhancers = [];

  if (propsOptions) {
    enhancers.push(withProps(propsOptions));
  }

  if (handlersOptions) {
    enhancers.push(withHandlers(handlersOptions));
  }

  return compose(...enhancers)(Component);
};

export default withPage;