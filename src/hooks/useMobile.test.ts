import { act, renderHook } from '@testing-library/react';

import { useIsMobile } from './useMobile';

describe('useMobile', () => {

  beforeAll(() => {
    global.innerWidth = 1024; // Default width (desktop)
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: global.innerWidth < 768,
      media: query,
      onchange: null,
      addEventListener: jest.fn((_, handler) => handler()),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn()
    }));
  });

  afterEach(() => {
    window.dispatchEvent(new Event('resize'));
    jest.clearAllMocks();
  });

  describe('#useIsMobile', () => {
    it('should return true when window width is less than 768px', () => {
      global.innerWidth = 500;
      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(true);
    });

    it('should return false when window width is greater than or equal to 768px', () => {
      global.innerWidth = 1024;
      const { result } = renderHook(() => useIsMobile());

      expect(result.current).toBe(false);
    });

    it('should update isMobile when the window is resized', () => {
      const { result } = renderHook(() => useIsMobile());

      act(() => {
        global.innerWidth = 600;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toBe(false);
    });
  });
});
