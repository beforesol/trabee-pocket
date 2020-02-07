export const toggleAttribute = (target: HTMLElement, ariaType: string) => {
  const targetAriaType = target.getAttribute(ariaType);

  if (targetAriaType === 'true') {
    target.setAttribute(ariaType, 'false');

    return false;
  } else {
    target.setAttribute(ariaType, 'true');

    return true;
  }
};
