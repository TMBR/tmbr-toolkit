export function pledge() {

  let resolve;
  let reject;

  const promise = new Promise((pass, fail) => {
    resolve = pass;
    reject = fail;
  });

  return { promise, resolve, reject };
};
