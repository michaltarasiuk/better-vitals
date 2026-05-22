class ExhaustivityCheckingError extends Error {
  name = "ExhaustivityCheckingError";
  expectedExhaustiveValue: never;
  constructor(expectedExhaustiveValue: never) {
    super("Internal error: exhaustivity checking failure");
    this.expectedExhaustiveValue = expectedExhaustiveValue;
  }
}

export function assertNever(value: never): never {
  throw new ExhaustivityCheckingError(value);
}
