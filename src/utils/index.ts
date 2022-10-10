export function cloneObj<T>(obj: T, exclude: Array<keyof typeof obj> = []) {
  obj = JSON.parse(JSON.stringify(obj));
  let excluded: {
    [key: string]: undefined;
  } = {};

  exclude.forEach((key) => {
    excluded[key as string] = undefined;
  });

  let cloned = Object.assign({}, obj, excluded);
  return cloned;
}
