import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, COMMAND_PRIORITY_NORMAL, createCommand } from "lexical";
import { PageBreakNode } from "./PageBreakNode";

export const INSERT_PAGE_BREAK = createCommand("insertPageBreak");
export function PageBreakPlugin(): null {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([PageBreakNode])) {
    throw new Error("Page Break Node not Registered");
  }
  editor.registerCommand(
    INSERT_PAGE_BREAK,
    () => {
      const selection = $getSelection();
      selection?.insertNodes([new PageBreakNode()]);
      return true;
    },
    COMMAND_PRIORITY_NORMAL
  );
  return null;
}
