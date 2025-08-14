import { NotasEntity } from '../entities/create-notas.entity';
import { UpdateNoteDto } from '../entities/update-nota.entity';

export abstract class INotasRepository {
  abstract createNota(note: NotasEntity): Promise<void>;
  abstract softDeleteNotes(id: string): Promise<{ message: string }>;
  abstract findById(id: string): Promise<NotasEntity | null>;
  abstract findTitleNotes(title: string): Promise<NotasEntity[]>;
  abstract updateNote(id: string, note: UpdateNoteDto): Promise<void>;
}
