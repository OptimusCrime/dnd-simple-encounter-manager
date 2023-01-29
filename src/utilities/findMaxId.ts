export function findMaxId<R extends { id: number }>(entities: R[]): number {
  return Math.max(-1, ...entities.map((entity) => entity.id));
}
