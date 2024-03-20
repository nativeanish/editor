import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@nextui-org/react";
import { FORMAT_TEXT_COMMAND, TextFormatType } from "lexical";
import {
  FaBold,
  FaUnderline,
  FaStrikethrough,
  FaItalic,
  FaHighlighter,
  FaCode,
  FaSubscript,
  FaSuperscript,
} from "react-icons/fa";
import usePara from "../../../../store/usePara";
// import clsx from "clsx";
const _text: Array<TextFormatType> = [
  "bold",
  "underline",
  "strikethrough",
  "italic",
  "code",
  "highlight",
  "subscript",
  "superscript",
];
function Paragraph() {
  const [editor] = useLexicalComposerContext();
  const isbold = usePara((state) => state.isBold);
  const isunderline = usePara((state) => state.isUnderline);
  const isstrikethrough = usePara((state) => state.isStrikethrough);
  const isitalic = usePara((state) => state.isItalic);
  const ishightlight = usePara((state) => state.isHighlight);
  const iscode = usePara((state) => state.isCode);
  const issubscript = usePara((state) => state.isSubscript);
  const issuperscript = usePara((state) => state.isSuperscript);
  return (
    <>
      {_text.map((e, i) => (
        <Button
          key={i}
          startContent={
            e === "bold" ? (
              <FaBold />
            ) : e === "underline" ? (
              <FaUnderline />
            ) : e === "strikethrough" ? (
              <FaStrikethrough />
            ) : e === "italic" ? (
              <FaItalic />
            ) : e === "highlight" ? (
              <FaHighlighter />
            ) : e === "code" ? (
              <FaCode />
            ) : e === "subscript" ? (
              <FaSubscript />
            ) : e === "superscript" ? (
              <FaSuperscript />
            ) : null
          }
          onClick={() => {
            e === "bold"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
              : e === "underline"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
              : e === "strikethrough"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
              : e === "italic"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
              : e === "highlight"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
              : e === "code"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
              : e === "subscript"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
              : e === "superscript"
              ? editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
              : null;
          }}
          color={
            e === "bold" && isbold
              ? "primary"
              : e === "underline" && isunderline
              ? "primary"
              : e === "strikethrough" && isstrikethrough
              ? "primary"
              : e === "italic" && isitalic
              ? "primary"
              : e === "highlight" && ishightlight
              ? "primary"
              : e === "code" && iscode
              ? "primary"
              : e === "subscript" && issubscript
              ? "primary"
              : e === "superscript" && issuperscript
              ? "primary"
              : "default"
          }
          // color={
          //   clsx("default", {
          //     primary:
          //       (e === "bold" && bold) ||
          //       (e === "underline" && underline) ||
          //       (e === "strikethrough" && strikethrough) ||
          //       (e === "italic" && italic) ||
          //       (e === "highlight" && hightlight) ||
          //       (e === "code" && code) ||
          //       (e === "subscript" && subscript) ||
          //       (e === "superscript" && superscript),
          //   }) as ButtonProps["color"]
          // }
        >
          {e}
        </Button>
      ))}
    </>
  );
}

export default Paragraph;
