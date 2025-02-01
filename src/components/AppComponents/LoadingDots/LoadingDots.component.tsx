import { mergeTestIds, testProps } from "@/lib/utils";

import Dot from "./Dot";
import config from "./LoadingDots.config";
import type { Props } from "./LoadingDots.type";

const { COMPONENT_NAME, Dots } = config;

const LoadingDots: React.FC<Props> = (props) => {
  const { screenName } = props;
  const testId = mergeTestIds(screenName, COMPONENT_NAME);

  return (
    <div
      {...testProps(testId)}
      className="flex justify-center items-center">
      {Dots.map((dotName, index) => (
        <Dot
          key={index}
          className={dotName.className}
          screenName={screenName}
          name={`${COMPONENT_NAME}_` + dotName.name} />
      ))}
    </div>
  );
};

export default LoadingDots;