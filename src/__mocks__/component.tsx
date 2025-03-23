export const MockComponent = (props: any) => {
  return <div {...props}>{props.children}</div>;
};
