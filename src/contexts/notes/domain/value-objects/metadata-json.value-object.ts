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
      throw new Error('La carpeta es requerida');
    }
    if (!version) {
      throw new Error('La versión es requerida');
    }
    if (!tags) {
      throw new Error('Las etiquetas son requeridas');
    }

    this.metadata = { tags, carpeta, version, lastEditBy };
  }

  getValuePrimitiveMetadata() {
    return { ...this.metadata };
  }
}
