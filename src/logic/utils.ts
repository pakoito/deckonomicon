export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const safeEntries = <T, K extends keyof T>(o: {
  [s in K]: T[s];
}): [K, T[K]][] => Object.entries(o).map(([k, v]) => [k as K, v as T[K]]);

export const safeValues = <T, K extends keyof T>(o: {
  [s in K]: T[s];
}): T[K][] => safeEntries(o).map((a) => a[1]);

export const safeKeys = <T, K extends keyof T>(o: {
  [s in K]: T[s];
}): K[] => safeEntries(o).map((a) => a[0]);
