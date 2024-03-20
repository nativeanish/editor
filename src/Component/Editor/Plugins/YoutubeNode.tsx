import { DecoratorNode, EditorConfig, LexicalEditor, NodeKey } from "lexical";
import { ReactNode } from "react";

export class YoutubeNode extends DecoratorNode<ReactNode> {
  __src: string;
  static getType(): string {
    return "youtube";
  }
  static clone(_data: YoutubeNode): YoutubeNode {
    return new YoutubeNode(_data.__src, _data.__key);
  }
  constructor(src: string, key?: NodeKey) {
    super(key);
    this.__src = src;
  }
  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement("div");
    element.className =
      "aspect-video w-full flex items-center justify-center p-8";
    return element;
  }
  updateDOM(): false {
    return false;
  }
  static importJSON(_serializedNode: any): YoutubeNode {
    const { src } = _serializedNode;
    return new YoutubeNode(src);
  }
  decorate(): ReactNode {
    const link = convertToEmbedLink(this.__src);
    return (
      <iframe
        src={link ? link : ""}
        allowFullScreen
        className="w-full h-full aspect-video"
      ></iframe>
    );
  }
  exportJSON() {
    return {
      src: this.__src,
      type: "youtube",
      version: 1,
    };
  }
}
export function $createYoutubeNode(src: string): YoutubeNode {
  return new YoutubeNode(src);
}
function convertToEmbedLink(originalLink: string): string | null {
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([^"&?/\s]{11})/;
  const match = originalLink.match(regex);
  if (match && match[1]) {
    const embedLink = `https://www.youtube.com/embed/${match[1]}`;
    return embedLink;
  } else {
    return null;
  }
}
