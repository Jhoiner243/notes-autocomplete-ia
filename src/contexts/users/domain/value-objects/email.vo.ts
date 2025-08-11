// domain/value-objects/email.vo.ts

export class Email {
  public readonly value: string;

  constructor(email: string) {
    this.value = email.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }
}
