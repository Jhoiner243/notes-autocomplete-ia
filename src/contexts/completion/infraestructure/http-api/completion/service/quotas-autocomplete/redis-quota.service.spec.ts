/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Redis } from 'ioredis';
import { RedisQuotaService } from './redis-quota.service';

describe('RedisQuotaService', () => {
  let redisMock: jest.Mocked<Redis>;
  let service: RedisQuotaService;

  beforeEach(() => {
    redisMock = {
      get: jest.fn(),
      multi: jest.fn().mockReturnValue({
        incrby: jest.fn().mockReturnThis(),
        expire: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([]),
      }),
    } as any;
    process.env.QUOTA_LIMIT = '100';
    service = new RedisQuotaService(redisMock);
  });

  it('should allow usage if under quota', async () => {
    redisMock.get.mockResolvedValue('10');
    const canUse = await service.canUse('user1');
    expect(canUse).toBe(true);
  });

  it('should deny usage if over quota', async () => {
    redisMock.get.mockResolvedValue('150');
    const canUse = await service.canUse('user1');
    expect(canUse).toBe(false);
  });

  it('should record usage', async () => {
    const multi = service['redis'].multi();
    await service.recordUsage('user1', 5);
    expect(multi.incrby).toHaveBeenCalled();
    expect(multi.expire).toHaveBeenCalled();
    expect(multi.exec).toHaveBeenCalled();
  });
});
