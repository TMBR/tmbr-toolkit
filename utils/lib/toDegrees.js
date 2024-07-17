/**
 * Converts radians to degrees
 *
 * @param  {number} radians
 * @return {number} degrees
 */
export function toDegrees(radians) {
  return radians * TO_DEGREES;
};

export const TO_DEGREES = 180 / Math.PI;
