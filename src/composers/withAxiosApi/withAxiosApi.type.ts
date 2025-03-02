export type Options = {
  url?: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  props?: object,
  options?: () => void,
  skipQueryOnRender?: boolean
};