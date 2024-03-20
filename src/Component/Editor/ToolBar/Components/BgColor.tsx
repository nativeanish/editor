import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@lexical/selection";
import { Button, Tooltip } from "@nextui-org/react";
import { Sketch } from "@uiw/react-color";
import { $getSelection } from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BiSolidColorFill } from "react-icons/bi";
function BgColor() {
  const [editor] = useLexicalComposerContext();
  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      editor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        { tag: "historic" }
      );
    },
    [editor]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  const [show, setShow] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const buttonRef = useRef<HTMLButtonElement>(null); // Set the type for buttonRef

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        show &&
        !(event.target as HTMLElement).closest(".your-color-picker-container")
      ) {
        setShow(false);
      }
    };
    const handleKeyPress = (event: KeyboardEvent) => {
      if (show && event.key !== "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [show]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onBgColorSelect(color);
  };

  const calculatePortalPosition = () => {
    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      return { top: buttonRect.bottom, left: buttonRect.left };
    }
    return { top: 0, left: 0 };
  };

  return (
    <>
      <Tooltip content="Background Color" placement="bottom-end">
        <Button isIconOnly onClick={() => setShow(true)} ref={buttonRef}>
          <BiSolidColorFill />
        </Button>
      </Tooltip>
      {show
        ? createPortal(
            <div
              className="your-color-picker-container"
              style={{
                position: "fixed",
                top: calculatePortalPosition().top,
                left: calculatePortalPosition().left,
              }}
            >
              <Sketch
                color={selectedColor}
                onChange={(e) => handleColorChange(e.hex)}
              />
            </div>,
            document.body
          )
        : null}
    </>
  );
}

export default BgColor;
