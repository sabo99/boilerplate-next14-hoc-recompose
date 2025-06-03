export const useRouter = jest.fn().mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn()
}));

export const useSearchParams = jest.fn().mockImplementation(() => ({
  get: jest.fn(),
  getAll: jest.fn(),
  has: jest.fn(),
  toString: jest.fn(),
  entries: jest.fn(),
  forEach: jest.fn(),
  keys: jest.fn(),
  values: jest.fn()
}));

export const usePathname = jest.fn().mockImplementation(() => '/mock-path');

export const useParams = jest.fn().mockImplementation(() => ({
  id: 'mock-id'
}));

export const redirect = jest.fn();

export const useSelectedLayoutSegment = jest.fn().mockImplementation(() => 'mock-segment');

export const useSelectedLayoutSegments = jest.fn().mockImplementation(() => ['mock', 'segment']);

export const useServerInsertedHTML = jest.fn((callback) => callback());

export const ServerInsertedHTMLContext = {};
