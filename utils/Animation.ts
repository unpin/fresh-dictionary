const DEFAULT_ANIMATION_OPTIONS: KeyframeAnimationOptions = {
  duration: 300,
  fill: "forwards",
  easing: "ease-out",
};

export function FadeInUp(
  element: HTMLElement,
  options: KeyframeAnimationOptions = {},
) {
  return element.animate([
    {
      top: "1rem",
      opacity: 0,
    },
    {
      top: 0,
      opacity: 1,
    },
  ], { ...DEFAULT_ANIMATION_OPTIONS, ...options });
}

export function FadeOutDown(
  element: HTMLElement,
  options: KeyframeAnimationOptions = {},
) {
  return element.animate([
    {
      top: 0,
      opacity: 1,
    },
    {
      top: "1rem",
      opacity: 0,
    },
  ], { ...DEFAULT_ANIMATION_OPTIONS, ...options });
}

export function BounceIn(
  element: HTMLElement,
  options: KeyframeAnimationOptions = {},
) {
  return element.animate([
    {
      scale: .85,
      opacity: .25,
    },
    {
      scale: 1,
      opacity: .85,
    },
    {
      opacity: 1,
      scale: .90,
    },
    {
      scale: 1,
    },
    {
      scale: .95,
    },
    {
      scale: 1,
    },
  ], { ...DEFAULT_ANIMATION_OPTIONS, ...options });
}
