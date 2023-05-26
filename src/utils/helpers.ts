export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getLSNested(path: string[]) {
  const json = localStorage.getItem(path[0]);
  if (!json) throw new Error(`no ${path[0]}`);

  let result = JSON.parse(json);
  for (let i = 1; i < path.length; i++) {
    result = result[path[i]];
  }
  return result;
}

export const request = async <
  F extends (...args: any[]) => ReturnType<F> | Promise<ReturnType<F>>
>(
  callback: F,
  ...args: Parameters<F>
): Promise<ReturnType<F>> => {
  await sleep(1000);
  return callback(...args);
};
