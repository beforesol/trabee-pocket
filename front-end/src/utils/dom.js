export const toggleAttribute = (target, ariaType) => {
  const targetAriaType = target.getAttribute(ariaType);

  if (targetAriaType === 'true') {
    target.setAttribute(ariaType, 'false');

    return false;
  } else {
    target.setAttribute(ariaType, 'true');

    return true;
  }
};
