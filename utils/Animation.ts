const DEFAULT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: 300,
  fill: "forwards",
  easing: "ease-out",
};

export function FadeInUp(
  el: HTMLElement,
  options?: KeyframeAnimationOptions,
) {
  el.animate([
    {
      top: "1rem",
      opacity: 0,
    },
    {
      top: 0,
      opacity: 1,
    },
  ], options || DEFAULT_ANIMATION_OPTIONS);
}

export function FadeOutDown(
  el: HTMLElement,
  options?: KeyframeAnimationOptions,
) {
  el.animate([
    {
      top: 0,
      opacity: 1,
    },
    {
      top: "1rem",
      opacity: 0,
    },
  ], options || DEFAULT_ANIMATION_OPTIONS);
}
