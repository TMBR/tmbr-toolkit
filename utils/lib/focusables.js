const not = {
  inert: ':not([inert]):not([inert] *)',
  tabindex: ':not([tabindex^="-"])',
  disabled: ':not(:disabled)',
};

/**
 * Exports an array of CSS selectors for elements that can receive focus
 * (based on {@link https://github.com/KittyGiraudel/focusable-selectors focusable-selectors})
 */
export const focusables = [
  `a[href]${not.inert}${not.tabindex}`,
  `area[href]${not.inert}${not.tabindex}`,
  `input:not([type="hidden"])${not.inert}${not.tabindex}${not.disabled}`,
  `input[type="radio"]${not.inert}${not.tabindex}${not.disabled}`,
  `select${not.inert}${not.tabindex}${not.disabled}`,
  `textarea${not.inert}${not.tabindex}${not.disabled}`,
  `button${not.inert}${not.tabindex}${not.disabled}`,
  `details${not.inert} > summary:first-of-type${not.tabindex}`,
  `iframe${not.inert}${not.tabindex}`,
  `audio[controls]${not.inert}${not.tabindex}`,
  `video[controls]${not.inert}${not.tabindex}`,
  `[contenteditable]${not.inert}${not.tabindex}`,
  `[tabindex]${not.inert}${not.tabindex}`,
];
