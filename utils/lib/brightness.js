/**
 * Calculates brightness from an rgb array
 *
 * @param rgb - array of red, green and blue values in the range 0-255
 *
 * @return brightness value between 0-255
 */
export function brightness(rgb) {
  return (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
};
