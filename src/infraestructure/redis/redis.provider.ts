import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

export const redisProvider: Provider = {
  provide: REDIS_CLIENT as string,
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('RedisProvider');
    const redisUrl: RedisOptions['path'] = configService.get('REDIS_URL');

    if (!redisUrl) {
      throw new Error('REDIS_URL no está definida en la configuración.');
    }

    const client = new Redis(redisUrl);

    client.on('connect', () => {
      logger.log('Conectado a Redis exitosamente.');
    });

    client.on('error', (error) => {
      logger.error('Error en la conexión con Redis:', error);
    });

    return client;
  },
  inject: [ConfigService],
};
