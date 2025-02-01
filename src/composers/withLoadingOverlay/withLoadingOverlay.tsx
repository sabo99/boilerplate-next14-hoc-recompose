import { compose, withState } from "react-recompose";

import LoadingOverlay from "@/components/AppComponents/LoadingOverlay";

import type { Props } from "./withLoadingOverlay.type";

const SubmissionLoadingOverlay = (ComposedComponent: any) => {
  const HOCLoadingOverlay = (props: Props) => {
    const { showLoadingOverlay } = props;
    return (
      <div>
        <ComposedComponent {...props} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    );
  };

  HOCLoadingOverlay.defaultProps = { showLoadingOverlay: false };

  return HOCLoadingOverlay;
};

const withLoadingOverlay = () => compose(
  withState('showLoadingOverlay', 'setShowLoadingOverlay', false),
  SubmissionLoadingOverlay
);

export default withLoadingOverlay;