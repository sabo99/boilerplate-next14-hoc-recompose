import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";

export const StyledContainer = (props: any) =>
  React.createElement(
    "div",
    {
      ...props,
      className: "grid grid-rows-[100px_1fr_100px] items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    },
    props.children
  );

export const StyledCard = (props: any) =>
  React.createElement(
    Card,
    {
      ...props,
      className: "flex flex-col gap-2 row-start-2 items-center sm:items-stretch"
    },
    props.children
  );

export const StyledCardFooter = (props: any) =>
  React.createElement(
    CardFooter,
    {
      ...props,
      className: "flex font-semibold leading-none tracking-tight"
    },
    props.children
  );

export const StyledButton = (props: any) =>
  React.createElement(
    Button,
    {
      ...props,
      className: "flex items-start",
      type: "button",
      variant: "link"
    },
    props.children
  );

export const StyledAnchor = (props: any) =>
  React.createElement(
    "a",
    {
      ...props,
      href: "https://ui.shadcn.com/",
      target: "_blank"
    },
    props.children
  );
