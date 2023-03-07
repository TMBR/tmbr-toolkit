export function createWorker(code) {
  const objectURL = URL.createObjectURL(new Blob([code]));
  return new Worker(objectURL);
};
