/**
 * Converts a hexidecimal string to an rgb array
 *
 * @param  {string} hex - original RRGGBB hex color, with or without the preceeding #
 *
 * @return {array} r, g and b values in the range 0-255
 */
export function toRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
};
