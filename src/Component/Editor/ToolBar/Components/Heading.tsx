import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { FaParagraph, FaCode } from "react-icons/fa";
import useHeading, { _h } from "../../../../store/useHeading";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { FaQuoteLeft } from "react-icons/fa";
import React from "react";
function Heading() {
  const [editor] = useLexicalComposerContext();
  const hp = useHeading((state) => state.hp);
  const set_hp = useHeading((state) => state.setHp);
  const set_headings = (e: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(e));
      }
    });
  };
  const set_para = (_: React.MouseEvent) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };
  const set_quote = (_: React.MouseEvent) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const set_code = (_: React.MouseEvent) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createCodeNode());
      }
    });
  };
  return (
    <ButtonGroup variant="solid" color="primary">
      <Button
        startContent={
          hp === "h1" ? (
            <LuHeading1 />
          ) : hp === "h2" ? (
            <LuHeading2 />
          ) : hp === "h3" ? (
            <LuHeading3 />
          ) : hp === "h4" ? (
            <LuHeading4 />
          ) : hp === "h5" ? (
            <LuHeading5 />
          ) : hp === "h6" ? (
            <LuHeading6 />
          ) : hp === "quote" ? (
            <FaQuoteLeft />
          ) : hp === "code" ? (
            <FaCode />
          ) : (
            <FaParagraph />
          )
        }
      >
        {hp === "h1" ? (
          <>Heading 1</>
        ) : hp === "h2" ? (
          <>Heading 2</>
        ) : hp === "h3" ? (
          <>Heading 3</>
        ) : hp === "h4" ? (
          <>Heading 4</>
        ) : hp === "h5" ? (
          <>Heading 5</>
        ) : hp === "h6" ? (
          <>Heading 6</>
        ) : hp === "quote" ? (
          <>Blockquote</>
        ) : hp === "code" ? (
          <>Code</>
        ) : (
          <>Paragraph</>
        )}
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
          selectedKeys={hp}
          selectionMode="single"
          className="max-w-[300px]"
          onSelectionChange={(e) => set_hp([...e][0] as _h)}
          variant="shadow"
          color="primary"
        >
          <DropdownItem
            key="paragraph"
            endContent={<FaParagraph />}
            description={<p>Editor</p>}
            onClick={set_para}
          >
            Paragraph
          </DropdownItem>
          <DropdownItem
            key="h1"
            endContent={<LuHeading1 />}
            description={<h1>Editor</h1>}
            onClick={() => set_headings("h1")}
          >
            Heading 1
          </DropdownItem>
          <DropdownItem
            key="h2"
            endContent={<LuHeading2 />}
            description={<h2>Editor</h2>}
            onClick={() => set_headings("h2")}
          >
            Heading 2
          </DropdownItem>
          <DropdownItem
            key="h3"
            endContent={<LuHeading3 />}
            description={<h3>Editor</h3>}
            onClick={() => set_headings("h3")}
          >
            Heading 3
          </DropdownItem>
          <DropdownItem
            key="h4"
            endContent={<LuHeading4 />}
            description={<h4>Editor</h4>}
            onClick={() => set_headings("h4")}
          >
            Heading 4
          </DropdownItem>
          <DropdownItem
            key="h5"
            endContent={<LuHeading5 />}
            description={<h5>Editor</h5>}
            onClick={() => set_headings("h5")}
          >
            Heading 5
          </DropdownItem>
          <DropdownItem
            key="h6"
            endContent={<LuHeading6 />}
            description={<h6>Editor</h6>}
            onClick={() => set_headings("h6")}
          >
            Heading 6
          </DropdownItem>
          <DropdownItem
            key="code"
            endContent={<FaQuoteLeft />}
            description={<h6>Blockquote</h6>}
            onClick={set_quote}
          >
            Quote
          </DropdownItem>
          <DropdownItem
            key="quote"
            endContent={<FaCode />}
            description={<h6>Hello, World</h6>}
            onClick={set_code}
          >
            Code
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}

export default Heading;
export const ChevronDownIcon = () => (
  <svg
    fill="none"
    height="14"
    viewBox="0 0 24 24"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill="currentColor"
    />
  </svg>
);
