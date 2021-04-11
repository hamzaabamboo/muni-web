export const groupBy = <T = any, K extends string | number | symbol = string>(
  data: T[],
  getKey: (data: T) => K
): Record<K, T[]> => {
  const groups = {} as Record<K, T[]>;
  data.forEach((p) => {
    if (!(getKey(p) in groups)) groups[getKey(p)] = [];
    groups[getKey(p)].push(p);
  });
  return groups;
};

export const mapValues = <
  T = any,
  V = any,
  K extends number | string | symbol = string,
  L extends number | string | symbol = string
>(
  obj: Record<K, T>,
  transform: (d: T, key: K) => V,
  transformKey?: (d: T, key: K) => L
): Record<L, V> => {
  return Object.fromEntries(
    Object.entries<T>(obj).map((entry) => {
      const [key, data] = entry;
      return [
        transformKey?.(data, key as K) ?? (key as K),
        transform(data, key as K),
      ] as [L | K, V];
    })
  ) as Record<K | L, V>;
};
