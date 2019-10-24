export const toggleAttribute = (target, ariaType) => {
  const targetAriaType = target.getAttribute(ariaType);

  if (targetAriaType === 'true') {
    target.setAttribute(ariaType, 'false');
  } else {
    target.setAttribute(ariaType, 'true');
  }
};
