import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../../../../../../../infraestructure/redis/redis.constants';
import { Injectable as CustomInjectable } from '../../../../../../shared/dependency-injection/custom-injectable';
import { IQuotaService } from '../../../../../domain/entities/control-cuota.interface';

export const RedisQuotaServiceToken = 'RedisQuotaServiceToken';

@CustomInjectable()
export class RedisQuotaService implements IQuotaService {
  private readonly quotaLimit: number;
  private readonly quotaTtlSeconds: number;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {
    this.quotaLimit = parseInt(process.env.QUOTA_LIMIT || '10000', 10);
    this.quotaTtlSeconds = 24 * 60 * 60;
  }

  private getKey(userId: string): string {
    const today = new Date().toISOString().slice(0, 10);
    return `quota:${userId}:${today}`;
  }

  async canUse(userId: string): Promise<boolean> {
    const key = this.getKey(userId);
    const used = parseInt((await this.redis.get(key)) || '0', 10);
    return used < this.quotaLimit;
  }

  async recordUsage(userId: string, tokens: number): Promise<void> {
    const key = this.getKey(userId);
    const tx = this.redis.multi();
    tx.incrby(key, tokens);
    tx.expire(key, this.quotaTtlSeconds);
    await tx.exec();
  }
}
