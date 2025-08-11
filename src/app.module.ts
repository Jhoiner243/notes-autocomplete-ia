import { Module } from '@nestjs/common';
import { CompletionModule } from './contexts/completion/completion.module';
import { PrismaModule } from './contexts/shared/prisma/prisma.module';
import { UserModule } from './contexts/users/users.module';

@Module({
  imports: [UserModule, PrismaModule, CompletionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
