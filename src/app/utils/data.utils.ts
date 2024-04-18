export function removeNulls<T>(data: T): T {
  for (const key in data) {
    if (data[key] === null) {
      delete data[key];
    }
  }
  return data;
}
