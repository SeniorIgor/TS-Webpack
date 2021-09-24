declare module '*.module.sass' {
  const Style: { [className: string]: string };
  export default Style;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
