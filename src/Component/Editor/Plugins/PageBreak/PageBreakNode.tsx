import {
  DecoratorNode,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import { ReactNode } from "react";

export class PageBreakNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return "pagebreak";
  }
  constructor(key?: NodeKey) {
    super(key);
  }
  static clone(_data: PageBreakNode): PageBreakNode {
    return new PageBreakNode();
  }
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    return document.createElement("div");
  }
  decorate(): ReactNode {
    return <hr className="border-t-2 border-black my-4" />;
  }
  updateDOM(): false {
    return false;
  }
  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return $createPageBreakNode();
  }
  exportJSON() {
    return {
      type: "pagebreak",
      version: 1,
    };
  }
}
export function $createPageBreakNode() {
  return new PageBreakNode();
}
export function $isPageBreakNode(
  node: LexicalNode | null | undefined
): node is PageBreakNode {
  return node instanceof PageBreakNode;
}
