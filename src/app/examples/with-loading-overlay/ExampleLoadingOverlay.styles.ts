import React from "react";

import { Table, TableHead } from "@/components/ui/table";

export const StyledContainer = (props: any) =>
  React.createElement(
    'div',
    {
      ...props,
      className: 'grid grid-cols-3 gap-6'
    },
    props.children
  );

export const StyledForm = (props: any) =>
  React.createElement(
    'form',
    {
      ...props,
      className: 'flex flex-col space-y-4'
    },
    props.children
  );

export const StyledTable = (props: any) =>
  React.createElement(
    Table,
    {
      ...props,
      className: 'col-span-2'
    },
    props.children
  );

export const StyledTableHead = (props: any) =>
  React.createElement(
    TableHead,
    {
      ...props,
      className: 'w-[100px] text-center font-semibold text-gray-800'
    },
    props.children
  );

export const StyledTableCell = (props: any) =>
  React.createElement(
    TableHead,
    {
      ...props,
      className: 'font-medium text-center'
    },
    props.children
  );