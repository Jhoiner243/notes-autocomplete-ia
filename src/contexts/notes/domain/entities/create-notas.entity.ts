import { randomUUID } from 'crypto';
import { MetadataValueObjects } from '../value-objects/metadata-json.value-object';
import { TitleNoteValueObject } from '../value-objects/title-note.value-object';

export class NotasEntity {
  constructor(
    public id: string,
    public title: TitleNoteValueObject,
    public content: string,
    public isDelete: boolean,
    public metadata: MetadataValueObjects,
    public version: number,
    public createdAt: Date,
  ) {}

  public static create(params: {
    title: TitleNoteValueObject;
    content: string;
    metadata: MetadataValueObjects;
  }): NotasEntity {
    return new NotasEntity(
      randomUUID(),
      params.title,
      params.content,
      false,
      params.metadata,
      this.versionNote(),
      new Date(),
    );
  }

  public static versionNote() {
    return Math.floor(Math.random() * 1000000) + 1;
  }

  public static update(
    existing: NotasEntity,
    params: {
      title?: TitleNoteValueObject;
      content?: string;
      metadata?: MetadataValueObjects;
    },
  ): NotasEntity {
    return new NotasEntity(
      existing.id,
      params.title ?? existing.title,
      params.content ?? existing.content,
      existing.isDelete,
      params.metadata ?? existing.metadata,
      this.versionNote(),
      existing.createdAt,
    );
  }

  public notaId() {
    return this.id;
  }

  public titleNote() {
    return this.title;
  }

  public contentNote() {
    return this.content;
  }

  public notasMetadata() {
    return this.metadata;
  }

  public isDeleteNote() {
    return this.isDelete;
  }

  public versionNote() {
    return this.version;
  }

  public createdAtNote() {
    return this.createdAt;
  }
}
