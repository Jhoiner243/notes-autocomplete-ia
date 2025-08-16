import { Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../../../../infraestructure/redis/redis.constants';
import { Injectable as CustomInjectable } from '../../../shared/dependency-injection/custom-injectable';

@CustomInjectable()
export class NotesCacheService {
  private readonly ttlSeconds = 60 * 60;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async getNote(noteId: string): Promise<string | null> {
    return this.redis.get(this.getKey(noteId));
  }

  async setNote(noteId: string, noteData: string): Promise<void> {
    await this.redis.set(this.getKey(noteId), noteData, 'EX', this.ttlSeconds);
  }

  async deleteNote(noteId: string): Promise<void> {
    await this.redis.del(this.getKey(noteId));
  }

  private getKey(noteId: string): string {
    return `note:${noteId}`;
  }
}
