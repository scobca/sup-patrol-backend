export function validateObject<T>(dtoInstance: T, source: any): Promise<T> {
  const result: any = {};

  for (const key in dtoInstance) {
    if (dtoInstance.hasOwnProperty(key)) {
      if (key in source) {
        result[key] = source[key];
      } else {
        result[key] = undefined;
      }
    }
  }

  return result;
}
