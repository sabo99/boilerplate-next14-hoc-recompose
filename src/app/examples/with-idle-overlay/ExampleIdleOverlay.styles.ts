import React from 'react';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'text-gray-700 text-sm'
    },
    props.children
  );

export const StyledTitle: React.FC<React.HTMLAttributes<HTMLParagraphElement> & { text: string }> = ({
  text, ...props
}) =>
  React.createElement(
    'p',
    {
      ...props,
      className: 'text-base font-semibold mb-3'
    },
    text
  );

export const StyledQuote: React.FC<React.HTMLAttributes<HTMLParagraphElement> & { text: string }> = ({
  text, ...props
}) =>
  React.createElement(
    'p',
    {
      ...props,
      className: 'text-gray-500 text-sm mt-5 border-l-4 border-blue-300 pl-3 italic'
    },
    text
  );