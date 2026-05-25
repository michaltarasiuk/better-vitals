export async function withMinimumDelay<T>(
  promise: Promise<T>,
  minDelay = 1000
) {
  const [result] = await Promise.all([promise, delay(minDelay)]);
  return result;
}

export function delay(ms: number) {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
}
