import { Button, Input, useDisclosure } from "@nextui-org/react";
import { MdLabel } from "react-icons/md";
import usePageHead from "../../../../store/usePageHead";
import { useState } from "react";
import Modals from "../../../Template/Modals";
import { useNavigate } from "react-router-dom";
import useAccount from "../../../../store/useAccount";
function Head() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <>
      <Button endContent={<MdLabel />} onPress={onOpen}>
        Heading
      </Button>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Change Heading"
        Body={<Body onClose={onClose} />}
      />
    </>
  );
}

function Body({ onClose }: { onClose: () => void }) {
  const set_headign = usePageHead((state) => state.set_heading);
  const heads = usePageHead((state) => state.heading);
  const [val, setVal] = useState(heads);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const username = useAccount((state) => state.username);
  const change = () => {
    console.log(val);
    setError(null);
    let regex: RegExp = /^[A-Za-z0-9\s]+$/;
    if (regex.test(val)) {
      setVal(val.split(" ").join("-"));
      set_headign(val.split(" ").join("-"));
      onClose();
      navigate(`/e/@/${username}/${val.split(" ").join("-")}`);
    } else {
      setError("Only Alphabets and Numbers are allowed");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Input
          type="text"
          startContent={<MdLabel />}
          onChange={(e) => setVal(e.currentTarget.value)}
          value={val}
          color="primary"
        />
        {error && <p className="text-red-500 m-4">{error}</p>}
        <Button
          type="button"
          onClick={() => change()}
          size="lg"
          className="mt-4"
        >
          Change
        </Button>
      </div>
    </>
  );
}

export default Head;
