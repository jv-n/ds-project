// Setup global para testes
import 'reflect-metadata';

// Mock global do console se necessário
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};