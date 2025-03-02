import React from 'react';

import { TableCell, TableHead } from '@/components/ui/table';

export const StyledContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'grid grid-cols-3 gap-6'
    },
    props.children
  );

export const StyledForm: React.FC<React.HTMLAttributes<HTMLFormElement>> = (props) =>
  React.createElement(
    'form',
    {
      ...props,
      className: 'flex flex-col space-y-4'
    },
    props.children
  );

export const StyledTableContainer: React.FC<React.HTMLAttributes<HTMLElement>> = (props) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'col-span-2'
    },
    props.children
  );

export const StyledTableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = (props) =>
  React.createElement(
    TableHead,
    {
      ...props,
      className: 'w-[100px] text-center font-semibold text-gray-800'
    },
    props.children
  );

export const StyledTableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = (props) =>
  React.createElement(
    TableCell,
    {
      ...props,
      className: 'font-medium text-center'
    },
    props.children
  );