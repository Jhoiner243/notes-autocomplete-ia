import { NotasEntity } from '../entities/create-notas.entity';

export abstract class INotasRepository {
  abstract createNota(note: NotasEntity, userId: string): Promise<NotasEntity>;
  abstract softDeleteNotes(id: string): Promise<{ message: string }>;
  abstract hardDeleteNotes(id: string): Promise<{ message: string }>;
  abstract findById(id: string): Promise<NotasEntity | null>;
  abstract findTitleNotes(title: string): Promise<NotasEntity[]>;
  abstract findAllByUser(userId: string): Promise<NotasEntity[]>;
  abstract updateNote(note: NotasEntity): Promise<void>;
}
