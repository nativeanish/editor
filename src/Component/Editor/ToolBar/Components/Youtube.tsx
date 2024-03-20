import { Button, Input, Tooltip, useDisclosure } from "@nextui-org/react";
import { IoLogoYoutube } from "react-icons/io";
import Modals from "../../../Template/Modals";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $createYoutubeNode } from "../../Plugins/YoutubeNode";
function Youtube() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip content="Add Youtube Video" placement="bottom-end">
        <Button startContent={<IoLogoYoutube />} onPress={onOpen}>
          Youtube
        </Button>
      </Tooltip>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Youtube"
        Body={<Body onClose={onClose} />}
      />
    </>
  );
}

export default Youtube;
function Body({ onClose }: { onClose: () => void }) {
  const [editor] = useLexicalComposerContext();
  const [video, setVideo] = useState("");
  const add = () => {
    if (!video) {
      onClose();
      return;
    }
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([$createYoutubeNode(video)]);
        onClose();
      }
    });
  };
  return (
    <>
      <Input
        type="text"
        onChange={(e) => setVideo(e.target.value)}
        placeholder="https://www.youtube.com/watch?v=reQxl5Rl4tE"
      />
      <Button onClick={() => add()}>Add</Button>
    </>
  );
}
