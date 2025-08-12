import { notesTitleExceptionError } from '../exceptions/notes.exception';

export class TitleNoteValueObject {
  public static readonly MAX_LENGTH = 100;

  public readonly value: string;

  private constructor(title: string) {
    this.value = title;
  }

  public static create(title: string): TitleNoteValueObject {
    if (title === null || title === undefined) {
      throw new notesTitleExceptionError(
        'El título no puede ser nulo o indefinido.',
      );
    }

    const trimmedTitle = title.trim();

    if (trimmedTitle.length === 0) {
      throw new notesTitleExceptionError('El título no puede estar vacío.');
    }

    if (trimmedTitle.length > this.MAX_LENGTH) {
      throw new notesTitleExceptionError(
        `El título no puede exceder los ${this.MAX_LENGTH} caracteres.`,
      );
    }

    return new TitleNoteValueObject(trimmedTitle);
  }
}
