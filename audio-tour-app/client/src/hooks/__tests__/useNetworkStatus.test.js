import { renderHook, act } from '@testing-library/react';
import useNetworkStatus from '../useNetworkStatus';
import { vi, describe, test, expect, beforeEach, afterAll } from 'vitest';

describe('useNetworkStatus', () => {
  // Save original navigator.onLine
  const originalNavigatorOnLine = window.navigator.onLine;
  
  // Mock event listeners
  let onlineListeners = [];
  let offlineListeners = [];
  
  beforeEach(() => {
    // Reset listeners
    onlineListeners = [];
    offlineListeners = [];
    
    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn((event, callback) => {
      if (event === 'online') {
        onlineListeners.push(callback);
      } else if (event === 'offline') {
        offlineListeners.push(callback);
      }
    });
    
    window.removeEventListener = vi.fn((event, callback) => {
      if (event === 'online') {
        onlineListeners = onlineListeners.filter(cb => cb !== callback);
      } else if (event === 'offline') {
        offlineListeners = offlineListeners.filter(cb => cb !== callback);
      }
    });
    
    // Mock navigator.connection
    if (!('connection' in navigator)) {
      Object.defineProperty(navigator, 'connection', {
        configurable: true,
        value: {
          type: 'wifi',
          effectiveType: '4g',
          saveData: false,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn()
        }
      });
    }
  });
  
  test('should return correct initial online status', () => {
    // Mock navigator.onLine to be true
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    
    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isOnline).toBe(true);
  });
  
  test('should return correct initial offline status', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    
    const { result } = renderHook(() => useNetworkStatus());
    
    expect(result.current.isOnline).toBe(false);
  });
  
  test('should update when going offline', () => {
    // Start online
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
    
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(true);
    
    // Trigger offline event
    act(() => {
      // Update navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        configurable: true,
        value: false,
      });
      
      // Trigger the offline event
      offlineListeners.forEach(listener => listener());
    });
    
    expect(result.current.isOnline).toBe(false);
  });
  
  test('should update when going online', () => {
    // Start offline
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current.isOnline).toBe(false);
    
    // Trigger online event
    act(() => {
      // Update navigator.onLine
      Object.defineProperty(navigator, 'onLine', {
        configurable: true,
        value: true,
      });
      
      // Trigger the online event
      onlineListeners.forEach(listener => listener());
    });
    
    expect(result.current.isOnline).toBe(true);
  });
  
  // Restore original navigator.onLine after all tests
  afterAll(() => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: originalNavigatorOnLine,
    });
  });
});