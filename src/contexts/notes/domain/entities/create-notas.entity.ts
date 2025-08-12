import { MetadataValueObjects } from '../value-objects/metadata-json.value-object';

export class NotasEntity {
  constructor(
    private id: string,
    private title: string,
    private content: string,
    private isDelete: boolean,
    private metadata: MetadataValueObjects,
    private version: Date,
    private createdAt: Date,
  ) {}

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
