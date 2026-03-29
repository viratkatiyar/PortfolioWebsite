declare module 'gsap-trial/SplitText' {
  export class SplitText {
    constructor(target: string | Element | Element[] | string[] | NodeList, vars?: object);
    revert(): void;
    words: Element[];
    lines: Element[];
    chars: Element[];
  }
  export default SplitText;
}
