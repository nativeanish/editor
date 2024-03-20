import { Button, Input, useDisclosure } from "@nextui-org/react";
import { FaImage } from "react-icons/fa";
import Modals from "../../../Template/Modals";
import { ChangeEvent, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import Img from "../../../Template/Img";
import { $createImageNode } from "../../Plugins/ImageNode";
function Image() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button startContent={<FaImage />} onPress={onOpen}>
        Upload Image
      </Button>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Upload Image"
        Body={<ImgBody onClose={onClose} />}
      />
    </>
  );
}

export function ImgBody({ onClose }: { onClose: () => void }) {
  const [editor] = useLexicalComposerContext();
  const [result, setResult] = useState("");
  const [text, setText] = useState("");
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // setSelectedImage(reader.result as string);
        // editor.update(() => {
        //   const selection = $getSelection();
        //   if ($isRangeSelection(selection)) {
        //     selection.insertNodes([
        //       $createImageNode(reader.result as string, "image"),
        //     ]);
        //     props.onClose();
        //   }
        // });
        setResult(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };
  const upload = () => {
    if (text.length) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          selection.insertNodes([$createImageNode(result, text)]);
          setResult("");
          onClose();
        }
      });
    } else {
      alert("Please add alt text");
    }
  };
  return (
    <>
      {result.length ? (
        <>
          <Img src={result} />
          <Input
            type="text"
            placeholder="Alt text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Button type="button" color="danger" onPress={() => setResult("")}>
            Remove
          </Button>
          <Button type="button" color="primary" onClick={() => upload()}>
            Submit
          </Button>
        </>
      ) : (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={handleImageChange}
          />

          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Image should be in Aspect 16:9 and must be less than 500KiB
          </div>
        </>
      )}
    </>
  );
}
export default Image;
