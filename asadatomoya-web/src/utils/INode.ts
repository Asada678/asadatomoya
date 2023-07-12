interface INode {
  qs: (selector: string, scope?: Document | HTMLElement) => Element | null;
  qsAll: (selector: string, scope?: Document | HTMLElement) => Element[];
  htmlToEl: (htmlStr: string) => ChildNode | null;
  getElement: (elementOrSelector: ElementParameter) => Element | null;
  isElement: (target: ElementParameter) => boolean;
  getRect: (el: ElementParameter) => DOMRect;
}

type ElementParameter = Element | string | null;

const INode: INode = {
  qs: (selector, scope) => {
    return (scope || document).querySelector(selector);
  },
  qsAll: (selector, scope) => {
    const els = (scope || document).querySelectorAll(selector);
    return Array.from(els);
  },
  htmlToEl: (htmlStr) => {
    const div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.firstElementChild;
  },
  isElement: (target) => {
    return target instanceof Element;
  },
  getElement: (elementOrSelector) => {
    return INode.isElement(elementOrSelector)
      ? (elementOrSelector as Element)
      : INode.qs(elementOrSelector as string);
  },
  getRect: (el) => {
    el = INode.getElement(el);
    if (!el) {
      throw new Error("Element is null");
    }
    return el?.getBoundingClientRect();
  },
};

export { INode };
