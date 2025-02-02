import { compose, withState } from "react-recompose";

import LoadingOverlay from "@/components/AppComponents/LoadingOverlay";

import type { Props } from "./withLoadingOverlay.type";

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
  withState('showLoadingOverlay', 'setShowLoadingOverlay', false),
  SubmissionLoadingOverlay
);

export default withLoadingOverlay;