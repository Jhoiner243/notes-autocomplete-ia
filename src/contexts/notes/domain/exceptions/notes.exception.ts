class DomainException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class notesTitleExceptionError extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
