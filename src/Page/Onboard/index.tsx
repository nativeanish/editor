import NameProfile from "./NameProfile";
import Intro from "./Intro";
import IImage from "./Image";
import { AnimatePresence } from "framer-motion";
import UserName from "./UserName";
import LastT from "./LastT";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { IoArrowBackSharp } from "react-icons/io5";
import useIntro from "../../store/Onboard/useIntro";
import useAddress from "../../store/useAddress";
import useAccount from "../../store/useAccount";
export default function OnBoard() {
  const _dt = useIntro((state) => state.data);
  const set = useIntro((state) => state.set);
  const navigate = useNavigate();
  const address = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", () => {
      if (!address?.length && account === null) {
        navigate("/");
      }
    });
  }, [account, address]);
  const back = () => {
    if (_dt === "name") {
      set("intro");
    }
    if (_dt === "username") {
      set("name");
    }
    if (_dt === "image") {
      set("username");
    }
  };
  return (
    <>
      {_dt === "intro" || _dt === "final" ? null : (
        <div className="pl-9 pt-9">
          <Button
            aria-label="back"
            size="lg"
            isIconOnly={true}
            onClick={() => back()}
          >
            <IoArrowBackSharp />
          </Button>
        </div>
      )}
      <div className="flex min-h-screen w-screen items-center justify-center bg-white ">
        <AnimatePresence mode="wait">
          {_dt === "intro" && <Intro key="intro" />}
          {_dt === "name" && <NameProfile key="name" />}
          {_dt === "username" && <UserName key="username" />}
          {_dt === "image" && <IImage key="image" />}
          {_dt === "final" && <LastT key="topics" />}
        </AnimatePresence>
      </div>
    </>
  );
}
