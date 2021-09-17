declare module '*.module.sass';

declare module '*.module.sass' {
  const Style: { [className: string]: string };
  export default Style;
}
