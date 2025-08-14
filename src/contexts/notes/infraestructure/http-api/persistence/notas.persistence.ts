import { Inject } from '@nestjs/common';
import { Prisma } from '../../../../../../generated/prisma/client';
import { PrismaService } from '../../../../../infraestructure/prisma/prisma.service';
import { Injectable as CustomInjectable } from '../../../../shared/dependency-injection/custom-injectable';
import { PersistenceError } from '../../../../shared/exceptions/persistence.exception';
import { NotasEntity } from '../../../domain/entities/create-notas.entity';
import { INotasRepository } from '../../../domain/repository/notas.repository';
import { NotaMapper } from './nota.mapper';

export const NotasPersistenceToken = Symbol('NotasPersistenceToken');

@CustomInjectable()
export class NotasPersistence implements INotasRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async softDeleteNotes(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.nota.update({
        data: { isDelete: true },
        where: { id: id },
      });

      return { message: 'La nota ha sido mandada a papelera.' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new PersistenceError(
          `La nota con ID "${id}" no fue encontrada para eliminar.`,
        );
      }
      console.error('Error en softDeleteNotes:', error);
      throw new PersistenceError(
        'Ocurrió un error al intentar eliminar la nota.',
      );
    }
  }

  async hardDeleteNotes(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.nota.delete({
        where: { id },
      });

      return { message: 'La nota ha sido eliminada permanentemente.' };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new PersistenceError(
          `La nota con ID "${id}" no fue encontrada para eliminar.`,
        );
      }
      console.error('Error en hardDeleteNotes:', error);
      throw new PersistenceError(
        'Ocurrió un error al eliminar la nota permanentemente.',
      );
    }
  }

  async findById(id: string): Promise<NotasEntity | null> {
    const notaByIdFromDb = await this.prisma.nota.findUnique({
      where: { id: id },
    });

    return notaByIdFromDb ? NotaMapper.toDomain(notaByIdFromDb) : null;
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
    try {
      await this.prisma.nota.update({
        data: {
          title: note.title.value,
          content: note.content,
          metadata: note.metadata.getValuePrimitiveMetadata(),
          version: note.version,
        },
        where: { id: note.id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new PersistenceError(
          `La nota con ID "${note.id}" no fue encontrada para actualizar.`,
        );
      }
      console.error('Error en updateNote:', error);
      throw new PersistenceError(
        'Ocurrió un error al intentar actualizar la nota.',
      );
    }
  }

  async createNota(note: NotasEntity, userId: string): Promise<NotasEntity> {
    try {
      const notaFromDb = await this.prisma.nota.create({
        data: {
          id: note.id,
          title: note.title.value,
          content: note.content,
          metadata: note.metadata.getValuePrimitiveMetadata(),
          version: note.version,
          user: {
            connect: { id: userId },
          },
        },
      });
      return NotaMapper.toDomain(notaFromDb);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new PersistenceError(
            `No se pudo crear la nota porque el usuario con ID "${userId}" no fue encontrado.`,
          );
        }
      }
      console.error('Error en createNota:', error);
      throw new PersistenceError('Ocurrió un error al intentar crear la nota.');
    }
  }
}
