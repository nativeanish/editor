import { DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { ReactNode } from "react";
import { Tweet } from "react-tweet";

export class TweetNode extends DecoratorNode<ReactNode> {
  __src: string;
  static getType(): string {
    return "tweet";
  }
  constructor(src: string, key?: NodeKey) {
    super(key);
    this.__src = src;
  }
  static clone(_data: TweetNode): TweetNode {
    return new TweetNode(_data.__src, _data.__key);
  }
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement("div");
    element.className = "w-full flex items-center justify-center";
    return element;
  }
  updateDOM(): false {
    return false;
  }
  static importJSON(_serializedNode: any): TweetNode {
    const { src } = _serializedNode;
    return new TweetNode(src);
  }
  decorate(): ReactNode {
    const id = extractStatusIdFromUrl(this.__src);
    console.log(id);
    return <Tweet id={id ? id : "1767257342968525087"} />;
  }
  exportJSON() {
    return {
      src: this.__src,
      type: "tweet",
      version: 1,
    };
  }
}
export function $createTweetNode(src: string): TweetNode {
  return new TweetNode(src);
}
function extractStatusIdFromUrl(url: string): string | null {
  const statusRegex = /status\/(\d+)/;
  const match = url.match(statusRegex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
