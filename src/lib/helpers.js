export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
export function el(type, className) {
  const element = document.createElement(type);

  if (className) {
    element.classList.add(className);
  }

  return element;
}