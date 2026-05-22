class InvariantError extends Error {
  name = "InvariantError";
  constructor(expectedInvariantMessage: string) {
    super(`Invariant: ${expectedInvariantMessage}`);
  }
}

export function invariant(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new InvariantError(message);
  }
}
