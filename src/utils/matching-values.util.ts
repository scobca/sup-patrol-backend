type ObjectType = { [key: string]: any };

export function findMatchingValues(
  obj1: ObjectType,
  obj2: ObjectType,
): ObjectType {
  const matches: ObjectType = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      if (obj1[key] === obj2[key]) {
        matches[key] = obj1[key];
      }
    }
  }

  return matches;
}
