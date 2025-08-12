import { NotasEntity } from '../entities/create-notas.entity';

export abstract class INotasRepository {
  abstract CreateNotas(note: NotasEntity): Promise<void>;
  abstract SoftDeleteNotes(id: string): Promise<{ message: string }>;
  abstract findById(id: string): Promise<NotasEntity>;
  abstract findTitleNotes(title: string): Promise<NotasEntity[]>;
  abstract updateNote(note: NotasEntity): Promise<void>;
}
