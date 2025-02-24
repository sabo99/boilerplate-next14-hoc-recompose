import React from "react";
import { compose } from "react-recompose";

import LoadingOverlay from "@/components/AppComponents/LoadingOverlay";
import {
  withConnectorLoadingOverlay
  // withStateLoadingOverlay
} from '@/composers/withLoadingOverlay/withLoadingOverlay.config';

type Props = {
  showLoadingOverlay: boolean
};

const ComposedLoadingOverlay = (ComposedComponent: React.ComponentType<any>) => {
  const HOC = (props: Props) => {
    const { showLoadingOverlay = false } = props;
    return (
      <div>
        <ComposedComponent {...props} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    );
  };

  return HOC;
};

const withLoadingOverlay = () => compose(
  withConnectorLoadingOverlay, // using connector (react-redux)
  // withStateLoadingOverlay,  // using withState (react-recompose)
  ComposedLoadingOverlay
);

export default withLoadingOverlay;