import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/react";
import { useState } from "react";
import {
  FiAlignCenter,
  FiAlignJustify,
  FiAlignLeft,
  FiAlignRight,
} from "react-icons/fi";
import { ChevronDownIcon } from "./Heading";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_ELEMENT_COMMAND } from "lexical";

function Align() {
  const [editor] = useLexicalComposerContext();
  const [align, setAlign] = useState<"left" | "right" | "center" | "justify">(
    "left"
  );
  return (
    <ButtonGroup variant="solid" color="primary">
      <Button
        startContent={
          align === "left" ? (
            <FiAlignLeft />
          ) : align === "center" ? (
            <FiAlignCenter />
          ) : align === "right" ? (
            <FiAlignRight />
          ) : align === "justify" ? (
            <FiAlignJustify />
          ) : null
        }
      >
        {align}
      </Button>
      <Dropdown placement="bottom-end" backdrop="opaque">
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="paragraph"
          selectedKeys={align}
          selectionMode="single"
          className="max-w-[300px]"
          onSelectionChange={(e) => setAlign([...e][0] as any)}
          variant="shadow"
          color="primary"
        >
          <DropdownItem
            key="left"
            endContent={<FiAlignLeft />}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            }}
          >
            Left
          </DropdownItem>
          <DropdownItem
            key="center"
            endContent={<FiAlignCenter />}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            }}
          >
            Center
          </DropdownItem>
          <DropdownItem
            key="right"
            endContent={<FiAlignRight />}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            }}
          >
            Right
          </DropdownItem>
          <DropdownItem
            key="justify"
            endContent={<FiAlignJustify />}
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            }}
          >
            Justify
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}

export default Align;
