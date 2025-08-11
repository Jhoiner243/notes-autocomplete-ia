// Objeto de inmutabilidad para el valor name

export class Name {
  public readonly value: string;
  constructor(name: string) {
    if (name.length < 2 || name.length > 50) {
      throw new Error('Nombre inválido');
    }

    this.value = name;
  }

  getValue(): string {
    return this.value;
  }
}
