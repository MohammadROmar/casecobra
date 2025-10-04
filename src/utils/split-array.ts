export function splitArray<T>(array: T[], partsNum: number) {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % partsNum;

    if (!result[index]) {
      result[i] = [];
    }

    result[index].push(array[i]);
  }

  return result;
}
