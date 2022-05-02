export const sleep = (ms: number): Promise<number> =>
  new Promise((resolve, reject) => {
    if (resolve) {
      setTimeout(resolve, ms);
    } else {
      reject();
    }
  });
