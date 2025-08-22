import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompletionModule } from './contexts/completion/completion.module';
import { NotasModule } from './contexts/notes/notas.module';
import { PrismaModule } from './contexts/shared/prisma/prisma.module';
import { SubscriptionModule } from './contexts/subscriptions/infraestructure/subscription.module';
import { UserModule } from './contexts/users/users.module';
import { RateLimitingModule } from './infraestructure/rate-limiting';
import { RedisModule } from './infraestructure/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    UserModule,
    PrismaModule,
    CompletionModule,
    SubscriptionModule,
    NotasModule,
    RateLimitingModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
