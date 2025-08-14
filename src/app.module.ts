import { Module } from '@nestjs/common';
import { CompletionModule } from './contexts/completion/completion.module';
import { NotasModule } from './contexts/notes/notas.module';
import { PrismaModule } from './contexts/shared/prisma/prisma.module';
import { UserModule } from './contexts/users/users.module';

@Module({
  imports: [UserModule, PrismaModule, CompletionModule, NotasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
