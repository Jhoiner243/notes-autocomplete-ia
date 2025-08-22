/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from '@nestjs/testing';
import { StripeService } from '../contexts/subscriptions/infraestructure/stripe.service';
import { PrismaService } from '../infraestructure/prisma/prisma.service';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';
process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
process.env.ENDPOINT_STRIPE_WEBHOOK = 'whsec_mock';
process.env.OPENAI_API_KEY = 'sk-mock';
process.env.ANTHROPIC_API_KEY = 'sk-ant-mock';
process.env.GOOGLE_API_KEY = 'mock-google-key';
process.env.GROQ_API_KEY = 'gsk_mock';

// Mock PrismaService
const mockPrismaService = {
  onModuleInit: jest.fn(),
  onModuleDestroy: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  nota: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  subscription: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  billingHistory: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  usageRecord: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  controlCuota: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

// Mock RedisService
const mockRedisService = {
  onModuleInit: jest.fn(),
  onModuleDestroy: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  incr: jest.fn(),
  expire: jest.fn(),
  ttl: jest.fn(),
};

// Mock StripeService
const mockStripeService = {
  createCustomer: jest.fn(),
  getOrCreateProduct: jest.fn(),
  getOrCreatePrice: jest.fn(),
  createCheckoutSession: jest.fn(),
  createSubscription: jest.fn(),
  constructorEvent: jest.fn(),
  handleWebhookEvent: jest.fn(),
};

// Mock AI SDK responses
const mockAIResponse = {
  completion: 'Mock AI completion response',
  usage: {
    promptTokens: 10,
    completionTokens: 20,
    totalTokens: 30,
  },
};

// Mock Redis client
const mockRedisClient = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
  exists: jest.fn(),
  incr: jest.fn(),
  expire: jest.fn(),
  ttl: jest.fn(),
  on: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
};

// Mock BullMQ
const mockBullMQ = {
  add: jest.fn(),
  process: jest.fn(),
  on: jest.fn(),
  close: jest.fn(),
};

// Test database configuration
const testDatabaseConfig = {
  database: 'test',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
};

// Test Redis configuration
const testRedisConfig = {
  host: 'localhost',
  port: 6379,
  password: '',
  db: 1, // Use different DB for testing
};

// Helper function to create testing module with mocks
export async function createTestingModuleWithMocks(
  imports: any[] = [],
  providers: any[] = [],
) {
  return Test.createTestingModule({
    imports,
    providers: [
      ...providers,
      {
        provide: PrismaService,
        useValue: mockPrismaService,
      },
      {
        provide: 'REDIS_CLIENT',
        useValue: mockRedisService,
      },
      {
        provide: StripeService,
        useValue: mockStripeService,
      },
    ],
  }).compile();
}

// Helper function to reset all mocks
export function resetAllMocks() {
  jest.clearAllMocks();
  jest.resetAllMocks();

  // Reset Prisma mocks
  Object.values(mockPrismaService).forEach((mock) => {
    if (typeof mock === 'object' && mock !== null) {
      Object.values(mock).forEach((fn) => {
        if (typeof fn === 'function') {
          fn.mockReset();
        }
      });
    }
  });

  // Reset Redis mocks
  Object.values(mockRedisService).forEach((mock) => {
    if (typeof mock === 'function') {
      mock.mockReset();
    }
  });

  // Reset Stripe mocks
  Object.values(mockStripeService).forEach((mock) => {
    if (typeof mock === 'function') {
      mock.mockReset();
    }
  });

  // Reset Redis client mocks
  Object.values(mockRedisClient).forEach((mock) => {
    if (typeof mock === 'function') {
      mock.mockReset();
    }
  });

  // Reset BullMQ mocks
  Object.values(mockBullMQ).forEach((mock) => {
    if (typeof mock === 'function') {
      mock.mockReset();
    }
  });
}

// Helper function to setup common test data
export function setupTestData() {
  // Mock user data
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Mock nota data
  const mockNota = {
    id: 'nota-1',
    title: 'Test Nota',
    content: 'Test content',
    userId: 'user-1',
    metadata: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Mock subscription data
  const mockSubscription = {
    id: 'sub-1',
    userId: 'user-1',
    stripeSubscriptionId: 'stripe-sub-1',
    planId: 'plan-1',
    status: 'ACTIVE',
    currentPeriodEnd: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Mock billing history data
  const mockBillingHistory = {
    id: 'bill-1',
    subscriptionId: 'sub-1',
    stripeInvoiceId: 'stripe-inv-1',
    amount: 1000,
    status: 'PAID',
    createdAt: new Date(),
  };

  // Setup Prisma mocks with test data
  mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
  mockPrismaService.user.create.mockResolvedValue(mockUser);
  mockPrismaService.user.update.mockResolvedValue(mockUser);

  mockPrismaService.nota.findUnique.mockResolvedValue(mockNota);
  mockPrismaService.nota.create.mockResolvedValue(mockNota);
  mockPrismaService.nota.update.mockResolvedValue(mockNota);
  mockPrismaService.nota.findMany.mockResolvedValue([mockNota]);

  mockPrismaService.subscription.findUnique.mockResolvedValue(mockSubscription);
  mockPrismaService.subscription.create.mockResolvedValue(mockSubscription);
  mockPrismaService.subscription.update.mockResolvedValue(mockSubscription);

  mockPrismaService.billingHistory.create.mockResolvedValue(mockBillingHistory);
  mockPrismaService.billingHistory.findMany.mockResolvedValue([
    mockBillingHistory,
  ]);

  // Setup Redis mocks
  mockRedisService.get.mockResolvedValue(null);
  mockRedisService.set.mockResolvedValue('OK');
  mockRedisService.del.mockResolvedValue(1);
  mockRedisService.exists.mockResolvedValue(0);
  mockRedisService.incr.mockResolvedValue(1);
  mockRedisService.expire.mockResolvedValue(1);
  mockRedisService.ttl.mockResolvedValue(3600);

  // Setup Stripe mocks
  mockStripeService.createCustomer.mockResolvedValue({
    id: 'cus_mock',
    email: 'test@example.com',
    metadata: { userId: 'user-1' },
  });

  mockStripeService.getOrCreateProduct.mockResolvedValue({
    id: 'prod_mock',
    name: 'Test Plan',
  });

  mockStripeService.getOrCreatePrice.mockResolvedValue({
    id: 'price_mock',
    unit_amount: 1000,
    currency: 'usd',
  });

  mockStripeService.createCheckoutSession.mockResolvedValue({
    id: 'cs_mock',
    url: 'https://checkout.stripe.com/mock',
  });

  return {
    mockUser,
    mockNota,
    mockSubscription,
    mockBillingHistory,
  };
}

// Global test setup
beforeAll(() => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
});

// Global test teardown
afterAll(() => {
  // Cleanup test environment
  resetAllMocks();
});

// Export all mocks and utilities
export {
  mockAIResponse,
  mockBullMQ,
  mockPrismaService,
  mockRedisClient,
  mockRedisService,
  mockStripeService,
  testDatabaseConfig,
  testRedisConfig,
};
