/**
 * Converts degrees to radians
 *
 * @param  {number} degrees
 * @return {number} radians
 */
export function toRadians(degrees) {
  return degrees * TO_RADIANS;
};

export const TO_RADIANS = Math.PI / 180;
