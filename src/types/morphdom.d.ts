declare module 'morphdom' {
  export interface MorphdomOptions {
    childrenOnly?: boolean;
    getNodeKey?: (node: Node) => any;
    onBeforeElUpdated?: (fromEl: Element, toEl: Element) => boolean;
    onElUpdated?: (el: Element) => void;
    onNodeAdded?: (node: Node) => void;
    onBeforeNodeAdded?: (node: Node) => Node | boolean | void;
    onBeforeNodeDiscarded?: (node: Node) => boolean | void;
    onNodeDiscarded?: (node: Node) => void;
    onBeforeElChildrenUpdated?: (fromEl: Element, toEl: Element) => boolean;
  }

  export default function morphdom(
    fromNode: Element | Node,
    toNode: Element | Node | string,
    options?: MorphdomOptions
  ): void;
}


