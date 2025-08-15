import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { CompletionModule } from './contexts/completion/completion.module';
import { NotasModule } from './contexts/notes/notas.module';
import { PrismaModule } from './contexts/shared/prisma/prisma.module';
import { UserModule } from './contexts/users/users.module';

@Module({
  imports: [
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
