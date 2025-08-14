import { MetadataExceptionError } from '../exceptions/notes.exception';

export class MetadataValueObjects {
  readonly metadata: {
    tags: string;
    carpeta: string;
    version: number;
    lastEditBy?: string;
  };

  constructor({
    tags,
    carpeta,
    version,
    lastEditBy,
  }: {
    tags: string;
    carpeta: string;
    version: number;
    lastEditBy?: string;
  }) {
    if (!carpeta) {
      throw new MetadataExceptionError('La carpeta es requerida');
    }
    if (!version) {
      throw new MetadataExceptionError('La versión es requerida');
    }
    if (!tags) {
      throw new MetadataExceptionError('Las etiquetas son requeridas');
    }

    this.metadata = { tags, carpeta, version, lastEditBy };
  }

  static create(raw: unknown): MetadataValueObjects {
    if (typeof raw !== 'object' || raw === null) {
      throw new MetadataExceptionError('Metadata debe ser un objeto');
    }
    const record = raw as Record<string, unknown>;
    const tags = record['tags'];
    const carpeta = record['carpeta'];
    const version = record['version'];
    const lastEditBy = record['lastEditBy'];

    if (typeof tags !== 'string') {
      throw new MetadataExceptionError('Metadata.tags debe ser string');
    }
    if (typeof carpeta !== 'string') {
      throw new MetadataExceptionError('Metadata.carpeta debe ser string');
    }
    if (typeof version !== 'number') {
      throw new MetadataExceptionError('Metadata.version debe ser number');
    }

    const last = typeof lastEditBy === 'string' ? lastEditBy : undefined;
    return new MetadataValueObjects({
      tags,
      carpeta,
      version,
      lastEditBy: last,
    });
  }

  getValuePrimitiveMetadata() {
    return { ...this.metadata };
  }
}
