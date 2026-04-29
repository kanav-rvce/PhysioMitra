/**
 * Test utilities for Emergency SOS UI improvements
 * 
 * This module provides utilities for:
 * - DOM testing with React Testing Library
 * - CSS property verification
 * - Map component mocking (Leaflet/react-leaflet)
 * - Property-based testing with fast-check
 */

export * from './cssUtils';
export * from './mapMocks';

// Re-export commonly used testing library functions
export { render, screen, waitFor, within } from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
export { vi, expect, describe, it, test, beforeEach, afterEach } from 'vitest';
export * as fc from 'fast-check';
