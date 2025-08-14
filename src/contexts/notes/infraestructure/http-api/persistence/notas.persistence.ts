import { Inject } from '@nestjs/common';
import { PrismaService } from '../../../../../infraestructure/prisma/prisma.service';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { NotasEntity } from '../../../domain/entities/create-notas.entity';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { NotaMapper } from './nota.mapper';

@CustomInjectable()
export class NotasPersistence implements INotasRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async softDeleteNotes(id: string): Promise<{ message: string }> {
    await this.prisma.nota.update({
      data: {
        isDelete: true,
      },
      where: {
        id: id,
      },
    });
    return { message: 'Nota eliminada correctamente' };
  }

  async hardDeleteNotes(id: string): Promise<{ message: string }> {
    await this.prisma.nota.delete({
      where: {
        id,
      },
    });
    return { message: 'Nota eliminada permanentemente' };
  }

  async findById(id: string): Promise<NotasEntity | null> {
    const notaByIdFromDb = await this.prisma.nota.findUnique({
      where: {
        id: id,
      },
    });

    if (notaByIdFromDb) {
      return NotaMapper.toDomain(notaByIdFromDb);
    }

    return null;
  }

  async findTitleNotes(title: string): Promise<NotasEntity[]> {
    const notasFromDb = await this.prisma.nota.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });

    return notasFromDb.map((nota) => NotaMapper.toDomain(nota));
  }

  async findAllByUser(userId: string): Promise<NotasEntity[]> {
    const notasFromDb = await this.prisma.nota.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return notasFromDb.map((n) => NotaMapper.toDomain(n));
  }

  async updateNote(note: NotasEntity): Promise<void> {
    await this.prisma.nota.update({
      data: {
        title: note.title.value,
        content: note.content,
        metadata: note.metadata.getValuePrimitiveMetadata(),
        version: note.version,
      },
      where: {
        id: note.id,
      },
    });
  }

  async createNota(note: NotasEntity): Promise<void> {
    await this.prisma.nota.create({
      data: {
        id: note.id,
        title: note.title.value,
        content: note.content,
        metadata: note.metadata.getValuePrimitiveMetadata(),
        version: note.version,
        // TODO: obtener userId real del contexto autenticado
        user: {
          connect: {
            id: '1',
          },
        },
      },
    });
  }
}
