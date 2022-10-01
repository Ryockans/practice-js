export const windowSize = {
  height: document.documentElement.clientHeight,
  width: document.documentElement.clientWidth
}

export function windowRecalc() {
  windowSize.height = document.documentElement.clientHeight;
  windowSize.width = document.documentElement.clientWidth;
}