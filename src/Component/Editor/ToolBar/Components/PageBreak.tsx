import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@nextui-org/react";
import { MdInsertPageBreak } from "react-icons/md";
import { INSERT_PAGE_BREAK } from "../../Plugins/PageBreak/PageBreakPlugin";
function PageBreak() {
  const [editor] = useLexicalComposerContext();

  return (
    <Button
      startContent={<MdInsertPageBreak />}
      onClick={() => editor.dispatchCommand(INSERT_PAGE_BREAK, undefined)}
    >
      Page Break
    </Button>
  );
}

export default PageBreak;
