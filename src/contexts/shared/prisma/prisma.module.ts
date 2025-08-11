import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../../../infraestructure/prisma/prisma.service';

@Global() // Esto hace que esté disponible en toda la app sin tener que importarlo en cada módulo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
