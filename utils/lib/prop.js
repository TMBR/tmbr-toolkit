/**
 * Gets a sets a CSS custom property on an element
 *
 * @param el    - element
 * @param name  - property name
 * @param value - property value
 *
 * @returns value (if getting) or undefined
 */
export function prop(el, name, value) {
  if (arguments.length < 3) {
    return el.style.getPropertyValue(name);
  } else {
    el.style.setProperty(name, value);
  }
};
