import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button, Tooltip } from "@nextui-org/react";
import { REDO_COMMAND, UNDO_COMMAND } from "lexical";
import { useState } from "react";
import { FaRedo, FaUndo } from "react-icons/fa";
function RedoUnDo() {
  const [editor] = useLexicalComposerContext();
  const [state, setState] = useState<"undo" | "redo" | null>(null);
  return (
    <>
      <Tooltip content="Redo">
        <Button
          isIconOnly
          color={state === "redo" ? "secondary" : "default"}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
            setState("redo");
          }}
        >
          <FaRedo />
        </Button>
      </Tooltip>
      <Tooltip content="Undo">
        <Button
          isIconOnly
          className="ml-2"
          color={state === "undo" ? "secondary" : "default"}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
            setState("undo");
          }}
        >
          <FaUndo />
        </Button>
      </Tooltip>
    </>
  );
}

export default RedoUnDo;
