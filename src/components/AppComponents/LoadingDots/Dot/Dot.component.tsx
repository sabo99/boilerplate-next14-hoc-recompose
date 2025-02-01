import React from "react";

import { mergeTestIds, testProps } from "@/lib/utils";

import config from './Dot.config';
import { DotContainer, DotStyle } from "./Dot.style";
import type { Props } from "./Dot.type";

const { COMPONENT_NAME, DOT_DIAMETER, calculateMargin } = config;

const Dot: React.FC<Props> = (props) => {
  const {
    screenName,
    name,
    className,
    size
  } = props;
  const testId = mergeTestIds(screenName, name, COMPONENT_NAME);
  const dotSize = size ? `${size}px` : `${DOT_DIAMETER}px`;
  const margin = size ? `${calculateMargin(size)}px` : `${calculateMargin(DOT_DIAMETER)}px`;

  return (
    <span
      {...testProps(testId)}
      className={DotContainer(className)}
      style={DotStyle(dotSize, margin)}
    />
  );
};

export default Dot;