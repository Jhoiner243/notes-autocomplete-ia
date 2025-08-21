import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompletionModule } from './contexts/completion/completion.module';
import { NotasModule } from './contexts/notes/notas.module';
import { PrismaModule } from './contexts/shared/prisma/prisma.module';
import { UserModule } from './contexts/users/users.module';
import { RedisModule } from './infraestructure/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    UserModule,
    PrismaModule,
    CompletionModule,
    NotasModule,
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
