export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterBySearch<T>(
  array: T[],
  search: string,
  keys: (keyof T)[]
): T[] {
  const lowerSearch = search.toLowerCase();
  return array.filter((item) =>
    keys.some((key) => String(item[key]).toLowerCase().includes(lowerSearch))
  );
}
