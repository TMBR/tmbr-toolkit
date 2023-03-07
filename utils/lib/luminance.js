/**
 * Calculates luminance from an rgb array
 *
 * @param  {array}  color array of red, green and blue values in the range 0-255
 * @return {number} luminance value between 0-255
 */
export function luminance(rgb) {
  return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
};
