// interface INode {
//   qs: (selector: string, scope?: Document | HTMLElement) => Element | null;
//   qsAll: (selector: string, scope?: Document | HTMLElement) => Element[];
//   htmlToEl: (htmlStr: string) => ChildNode | null;
//   getElement: (elementOrSelector: string | Element) => Element | null;
//   isElement: (target: string | Element) => boolean;
//   getRect: (el: Element | string) => DOMRect | null;
//   getDS: (
//     elementOrSelector: string | Element,
//     key: string
//   ) => string | undefined;
//   hasDS: (el: string | Element, key: string) => boolean;
// }

// const INode: INode = {
//   qs(selector, scope) {
//     return (scope || document).querySelector(selector);
//   },
//   qsAll(selector, scope) {
//     const els = (scope || document).querySelectorAll(selector);
//     return Array.from(els);
//   },
//   htmlToEl(htmlStr) {
//     const div = document.createElement("div");
//     div.innerHTML = htmlStr;
//     return div.firstElementChild;
//   },
//   isElement(target) {
//     return target instanceof Element;
//   },
//   getElement(elementOrSelector) {
//     return this.isElement(elementOrSelector)
//       ? (elementOrSelector as Element)
//       : this.qs(elementOrSelector as string);
//   },
//   getRect(el) {
//     el = this.getElement(el);
//     return el.getBoundingClientRect();
//   },
//   getDS(elementOrSelector, key) {
//     const el = this.getElement(elementOrSelector);
//     return el?.dataset?.[key];
//   },
//   hasDS(el, key) {
//     el = this.getElement(el);
//     return key in el?.dataset;
//   },
// };

// export { INode };
