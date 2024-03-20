import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import Align from "./Components/Align";
import Heading from "./Components/Heading";
import List from "./Components/List";
import Paragraph from "./Components/Paragraph";
import RedoUnDo from "./Components/RedoUndo";
import { $getSelection, $isRangeSelection, EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useHeading from "../../../store/useHeading";
import usePara from "../../../store/usePara";
import useList from "../../../store/useList";
import { $isListNode } from "@lexical/list";
import { $isHeadingNode } from "@lexical/rich-text";
import GenS from "./Components/GenS";
import FontSize from "./Components/FontSize";
import { useCallback, useEffect, useState } from "react";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import { $isCodeNode, getDefaultCodeLanguage } from "@lexical/code";
import Code from "./Components/Code";
import Image from "./Components/Image";
import FontColor from "./Components/FontColor";
import BgColor from "./Components/BgColor";
import Youtube from "./Components/Youtube";
import Twitter from "./Components/Twitter";
import Link from "./Components/Link";
import { getSelectedNode } from "../Plugins/FloatingLink";
import { $isLinkNode } from "@lexical/link";
import PageBreak from "./Components/PageBreak";
import Head from "./Components/Head";
import Publish from "./Components/Publish";

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const set_h = useHeading((state) => state.setHp);
  const setBold = usePara((state) => state.setBold);
  const setCode = usePara((state) => state.setCode);
  const setUnderline = usePara((state) => state.setUnderline);
  const setStrike = usePara((state) => state.setStrikethrough);
  const setItalic = usePara((state) => state.setItalic);
  const setHighlight = usePara((state) => state.setHighlight);
  const setSubscript = usePara((state) => state.setSubscript);
  const setSuperscript = usePara((state) => state.setSuperscript);
  const setNumber = useList((state) => state.setNumber);
  const setBullet = useList((state) => state.setBullet);
  const hp = useHeading((state) => state.hp);
  const [fontSize, setFontSize] = useState("15px");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [isLink, setLink] = useState(false);
  const onChange = (e: EditorState) => {
    e.read(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();
        const elementKey = element.getKey();
        const elementDOM = editor.getElementByKey(elementKey);
        if (elementDOM !== null) {
          setSelectedElementKey(elementKey);
          if ($isListNode(element)) {
            const type = element.getListType();
            if (type === "bullet") {
              setBullet(true);
              setNumber(false);
            }
            if (type === "number") {
              setNumber(true);
              setBullet(false);
            }
          } else {
            setBullet(false);
            setNumber(false);
          }
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          set_h(type);
          if ($isCodeNode(element)) {
            set_h("code");
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
        setBold(selection.hasFormat("bold"));
        setCode(selection.hasFormat("code"));
        setUnderline(selection.hasFormat("underline"));
        setStrike(selection.hasFormat("strikethrough"));
        setItalic(selection.hasFormat("italic"));
        setHighlight(selection.hasFormat("highlight"));
        setSubscript(selection.hasFormat("subscript"));
        setSuperscript(selection.hasFormat("superscript"));

        const node = getSelectedNode(selection);
        const parent = node.getParent();
        if ($isLinkNode(parent) || $isLinkNode(node)) {
          setLink(true);
        } else {
          setLink(false);
        }
      }
    });
  };

  const $updateTootlbar = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setFontSize(
          $getSelectionStyleValueForProperty(selection, "font-size", "15")
        );
      }
    });
  }, [editor]);
  useEffect(() => {
    $updateTootlbar();
    // console.log(codeLanguage);
  }, [editor, codeLanguage]);
  return (
    <div className="w-full md:w-1/2 m-1 p-1 space-y-3 space-x-3 overflow-y-auto border-blue-700 border-2 rounded-md md:h-full md:border-0">
      <RedoUnDo />
      <Heading />
      {hp === "code" ? (
        <>
          <Code
            selcetd={codeLanguage}
            selectedElementKey={selectedElementKey}
          />
        </>
      ) : (
        <>
          <FontSize selectionFontSize={fontSize.slice(0, -2)} editor={editor} />
          <Paragraph />
          <FontColor />
          <BgColor />
          <List />
          <Link isLink={isLink} />
          <Align />
          <PageBreak />
          <Image />
          <Youtube />
          <Twitter />
          <GenS />
          <Head />
          <Publish />
        </>
      )}

      <OnChangePlugin onChange={onChange} />
    </div>
  );
}

export default Toolbar;
