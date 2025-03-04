import { transformObjectKeysToLowercase } from '@/lib/utils';

export const MockComponent = (props: any) => {
  const lowerCaseProps = transformObjectKeysToLowercase(props);

  return <div {...lowerCaseProps}>{lowerCaseProps.children}</div>;
};
