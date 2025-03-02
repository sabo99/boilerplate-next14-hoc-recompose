import React from 'react';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'flex justify-center items-center'
    },
    props.children
  );
