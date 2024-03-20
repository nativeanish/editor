import { Button, Input, Tooltip, useDisclosure } from "@nextui-org/react";
import Modals from "../../../Template/Modals";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { FaXTwitter } from "react-icons/fa6";
import { $createTweetNode } from "../../Plugins/TweetNode";
function Twitter() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Tooltip content="Add Tweet" placement="bottom-end">
        <Button startContent={<FaXTwitter />} onPress={onOpen}>
          Tweet
        </Button>
      </Tooltip>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Tweet"
        Body={<Body onClose={onClose} />}
      />
    </>
  );
}

export default Twitter;
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
        selection.insertNodes([$createTweetNode(video)]);
        onClose();
      }
    });
  };
  return (
    <>
      <Input
        type="text"
        onChange={(e) => setVideo(e.target.value)}
        placeholder="https://twitter.com/elonmusk/status/1767108624038449405"
      />
      <Button onClick={() => add()}>Add</Button>
    </>
  );
}
