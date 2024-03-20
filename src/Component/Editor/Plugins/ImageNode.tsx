import { DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { ReactNode } from "react";
import Img from "../../Template/Img";
export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __alt: string;
  static getType(): string {
    return "image";
  }
  static clone(_data: ImageNode): ImageNode {
    return new ImageNode(_data.__src, _data.__alt, _data.__key);
  }
  constructor(src: string, alt: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__alt = alt;
  }
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    return document.createElement("div");
  }
  decorate(): ReactNode {
    return <Img src={this.__src} alt={this.__alt} />;
  }

  updateDOM(): false {
    return false;
  }
  static importJSON(serializedNode: any): ImageNode {
    const { src, alt } = serializedNode;
    return new ImageNode(src, alt);
  }
  exportJSON() {
    return {
      src: this.__src,
      alt: this.__alt,
      type: "image",
      version: 1,
    };
  }
}
export function $createImageNode(src: string, alt: string): ImageNode {
  return new ImageNode(src, alt);
}
