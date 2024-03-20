import { Button, Input, Kbd, Spinner, useDisclosure } from "@nextui-org/react";
import { TbBrandStorytel } from "react-icons/tb";
import Modals from "../../../Template/Modals";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Alert from "../../../Template/Alert";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, TextNode } from "lexical";

function GenS() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Button
        color="default"
        startContent={<TbBrandStorytel />}
        onPress={onOpen}
      >
        Generate Text
      </Button>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Generate Text"
        Body={<GenImg onClose={onClose} />}
      ></Modals>
    </>
  );
}

export default GenS;

export function GenImg(props: { onClose: () => void }) {
  const [editor] = useLexicalComposerContext();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ideal" | "text">("ideal");
  const [text, setText] = useState<string>("");
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setStatus("ideal");
    e.preventDefault();
    const target = e.target as typeof e.target & {
      text: { value: string };
    };
    if (!target.text.value.length) {
      return 0;
    }
    setStatus("loading");
    generate(target.text.value)
      .then((e) => {
        setText(e);
        setStatus("text");
      })
      .catch((e) => {
        setError(e);
        setStatus("ideal");
      });
  };
  const generate = async (prompt: string) => {
    setText("");
    prompt += "with no bulletins or numbering, in simple text";
    console.log(prompt);
    const genAi = new GoogleGenerativeAI(
      "AIzaSyDzzGp-zFoT_BWPfpdcrxrpticXwd1siK8"
    );
    const model = genAi.getGenerativeModel({ model: "gemini-1.0-pro-001" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    setStatus("text");
    return text;
  };

  const Insert = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // const para = selection.insertParagraph();
        // if (para) {
        //   $convertFromMarkdownString(text, TRANSFORMERS, para);
        // }
        selection.insertNodes([new TextNode(text)]);
        props.onClose();
      }
    });
  };
  return (
    <div className="text-center">
      {status === "loading" ? (
        <>
          <Spinner size="lg" color="primary" />
          <h3 className="text-center">Generating</h3>
        </>
      ) : status === "ideal" ? (
        <form onSubmit={formSubmit}>
          <Input
            type="text"
            size="lg"
            color="primary"
            variant="faded"
            label="Write a Prompt"
            endContent={<Kbd className="bg-blue-500 text-white">Enter</Kbd>}
            name="text"
          />
        </form>
      ) : status === "text" ? (
        <>
          <p>{text}</p>
          <Button type="button" color="primary" onClick={() => Insert()}>
            Format & Insert in Editor
          </Button>
        </>
      ) : (
        <>
          <h1>Something went wrong</h1>
        </>
      )}
      {error?.length ? <Alert title="Error" descrption={error} /> : null}
    </div>
  );
}
