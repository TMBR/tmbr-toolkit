const TO_DEGREES = /* @__PURE__ */ (() => 180 / Math.PI)();

/**
 * Converts radians to degrees
 *
 * @param  {number} radians
 * @return {number} degrees
 */
export function toDegrees(radians) {
  return radians * TO_DEGREES;
};
