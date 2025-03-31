import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../useMediaQuery';
import { vi, describe, test, expect, beforeEach } from 'vitest';

describe('useMediaQuery', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(min-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  test('should return true when media query matches', () => {
    // Set up the mock to return true
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(true);
  });

  test('should return false when media query does not match', () => {
    // Set up the mock to return false
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }));
    
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    expect(result.current).toBe(false);
  });
});