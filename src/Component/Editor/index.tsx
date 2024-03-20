import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import ErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import Toolbar from "./ToolBar";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode } from "lexical";
import theme from "../../utils/theme";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import CodeHighlightPlugin from "../../utils/CodeHighlightPlugin";
import { ImageNode } from "./Plugins/ImageNode";
import { YoutubeNode } from "./Plugins/YoutubeNode";
import { TweetNode } from "./Plugins/TweetNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import DraggableBlockPlugin from "./Plugins/DraggableBlockPlugin/Index";
import { useState } from "react";
import ComponentPickerMenuPlugin from "./Plugins/ComponentPickerPlugin";
import { PageBreakNode } from "./Plugins/PageBreak/PageBreakNode";
import { PageBreakPlugin } from "./Plugins/PageBreak/PageBreakPlugin";
// import useAddress from "../store/useAddress";
// import useAccount from "../store/useAccount";
// import { useNavigate, useParams } from "react-router-dom";
// import usePageHead from "../store/usePageHead";
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const EMAIL_MATCHER =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
const MATCHERS = [
  (text: string) => {
    const match = URL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
      }
    );
  },
  (text: string) => {
    const match = EMAIL_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: `mailto:${match[0]}`,
      }
    );
  },
];
interface Props {
  editable: boolean;
  toolbar: boolean;
  state?: string;
}
function Editor({ editable, toolbar, state }: Props) {
  //   const address = useAddress((state) => state.address);
  //   const account = useAccount((state) => state.account);
  //   const _username = useAccount((state) => state.username);
  //   const set_Head = usePageHead((state) => state.set_heading);
  //   const navigate = useNavigate();
  //   const { username, head } = useParams();
  //   useEffect(() => {
  //     if (!username?.length || !head?.length) {
  //       navigate("/");
  //     }
  //     if (!address?.length || !account) {
  //       navigate("/");
  //     }
  //     if (username !== _username) {
  //       navigate("/");
  //     }
  //     if (head) {
  //       set_Head(head);
  //     }
  //   }, [address, account]);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const initalConfig: InitialConfigType = {
    namespace: "Editor",
    onError: (e: Error) => console.log(e),
    theme: theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ParagraphNode,
      ListItemNode,
      ListNode,
      CodeNode,
      CodeHighlightNode,
      ImageNode,
      YoutubeNode,
      TweetNode,
      AutoLinkNode,
      LinkNode,
      PageBreakNode,
    ],
    editable: editable,
    editorState: state,
  };
  return (
    <>
      <div className="container mx-auto">
        <LexicalComposer initialConfig={initalConfig}>
          {toolbar ? (
            <div className="flex items-center lg:justify-center sm:justify-start">
              <Toolbar />
            </div>
          ) : null}
          <div className="p-2 md:p-0">
            <div
              className="container mx-auto md:w-1/2 w-full relative mt-3"
              ref={onRef}
            >
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="p-2 border-2 rounded-lg bg-gray-100" />
                }
                placeholder={
                  <div className="absolute top-3 left-3">Enter Here!</div>
                }
                ErrorBoundary={ErrorBoundary}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <CodeHighlightPlugin />
              <LinkPlugin />
              {floatingAnchorElem ? (
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
              ) : null}
              <AutoLinkPlugin matchers={MATCHERS} />
              <ComponentPickerMenuPlugin />
              <PageBreakPlugin />
            </div>
          </div>
        </LexicalComposer>
      </div>
    </>
  );
}

export default Editor;
