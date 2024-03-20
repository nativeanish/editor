import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@nextui-org/react";
import { ImListNumbered, ImList2 } from "react-icons/im";
import useList from "../../../../store/useList";
function List() {
  const [editor] = useLexicalComposerContext();
  const isnumber = useList((state) => state.isNumber);
  const isbullet = useList((state) => state.isBullet);
  return (
    <>
      <Button
        color={isnumber ? "primary" : "default"}
        startContent={<ImListNumbered />}
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
      >
        Number
      </Button>
      <Button
        color={isbullet ? "primary" : "default"}
        startContent={<ImList2 />}
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
      >
        Bullet
      </Button>
    </>
  );
}

export default List;
