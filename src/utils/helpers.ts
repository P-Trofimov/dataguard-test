export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getLS(path: string[]) {
  const json = localStorage.getItem(path[0]);
  if (json === null) throw new Error(`no ${path[0]}`);

  let result = JSON.parse(json);
  for (let i = 1; i < path.length; i++) {
    result = result[path[i]];
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setNested = (obj: any, path: string[], value: unknown): any => {
  const [first, ...rest] = path;
  return {
    ...obj,
    [first]: rest.length ? setNested(obj[first], rest, value) : value,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setLS(path: string[], value: any) {
  const jsonString = localStorage.getItem(path[0]);
  if (!jsonString) throw new Error(`no ${path[0]}`);

  if (path.length === 1) {
    localStorage.setItem(path[0], JSON.stringify(value));
    return;
  }

  const whole = JSON.parse(jsonString);
  const afterSet = setNested(whole, path.slice(1), value);

  localStorage.setItem(path[0], JSON.stringify(afterSet));
}

export const request = async <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => ReturnType<F> | Promise<ReturnType<F>>
>(
  callback: F,
  ...args: Parameters<F>
): Promise<ReturnType<F>> => {
  await sleep(100);
  return callback(...args);
};
