import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import { FaLink } from "react-icons/fa6";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "../../Plugins/FloatingLink";
function Link({ isLink }: { isLink: boolean }) {
  const [editor] = useLexicalComposerContext();
  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);
  return (
    <>
      <Button startContent={<FaLink />} onClick={insertLink}>
        Link
      </Button>
      {isLink && createPortal(<FloatingLinkEditor />, document.body)}
    </>
  );
}

export default Link;
