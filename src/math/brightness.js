/**
 * Calculates brightness from an rgb array
 *
 * @param  {array}  color array of red, green and blue values in the range 0-255
 * @return {number} brightness value between 0-255
 */
export function brightness(rgb) {
  return (0.299 * rgb[0]) + (0.587 * rgb[1]) + (0.114 * rgb[2]);
};
