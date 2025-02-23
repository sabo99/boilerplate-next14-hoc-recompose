import React from "react";
import { compose } from "react-recompose";

import LoadingOverlay from "@/components/AppComponents/LoadingOverlay";

type Props = {
  showLoadingOverlay: boolean
};

const SubmissionLoadingOverlay = (ComposedComponent: React.ComponentType<any>) => {
  const HOCLoadingOverlay = (props: Props) => {
    const { showLoadingOverlay = false } = props;
    return (
      <div>
        <ComposedComponent {...props} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    );
  };

  return HOCLoadingOverlay;
};

const withLoadingOverlay = () => compose(
  SubmissionLoadingOverlay
);

export default withLoadingOverlay;