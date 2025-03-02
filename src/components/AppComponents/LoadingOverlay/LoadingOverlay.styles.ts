import React from 'react';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'flex w-full h-full justify-center items-center bg-black bg-opacity-70 fixed top-0 left-0 z-50'
    },
    props.children
  );

export const StyledContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'py-[90px] px-[287px]'
    },
    props.children
  );