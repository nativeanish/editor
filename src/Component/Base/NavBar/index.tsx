import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@nextui-org/react";
// import ArConnect from "../Image/ArConnect";
import ArConnect from "../../../images/img/ArConnect";
// import Arweave from "../Image/Arweave-app";
import Arweave from "../../../images/img/Arweave-app";
// import useNavbarButton from "../store/useNavbarButton";
// import Metamask from "../Image/Metamask";
import Metamask from "../../../images/img/Metamask";
// import Othent from "../Image/Othent";
import Othent from "../../../images/img/Othent";
// import { useAccount, useConnect } from "wagmi";
import InjectedWallet from "../../../images/img/InjectedWallet";
import { ChevronDownIcon } from "../../Editor/ToolBar/Components/Heading";
import { checkConnection, connect } from "../../../utils/arconnect";
import { useEffect } from "react";
import useAddress from "../../../store/useAddress";
import { check_user } from "../../../utils/ao";
import useAccount from "../../../store/useAccount";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
// import _connect, { connect_auto, ether_connect } from "../utils/connect";
// import { useEffect } from "react";
// import useAddress from "../store/useAddress";
// import { check } from "../utils/warp-connector";
// import { disconnect } from "wagmi/actions";
// import { useNavigate } from "react-router-dom";
function NavBar() {
  //   const { connect, connectors, isLoading, pendingConnector } = useConnect();
  //   const setType = useNavbarButton((state) => state.setType);
  //   const _address = useAddress((state) => state.address);
  //   const { address, connector, isConnected } = useAccount();
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     disconnect().then().catch();
  //     connect_auto();
  //     if (_address?.length) {
  //       check()
  //         .then((data) => {
  //           if (data) {
  //             if (data.success === false && data.data === "No Account Found") {
  //               navigate("/onboard");
  //             }
  //           }
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //     if (address?.length && isConnected) {
  //       ether_connect();
  //     }
  //   }, [_address, address, connector, isConnected, navigate]);
  //   const _type = useNavbarButton((state) => state.type);
  const addrses = useAddress((state) => state.address);
  const account = useAccount((state) => state.account);
  const naviagte = useNavigate();
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", () => {
      checkConnection();
    });
    if (addrses?.length) {
      // check_user_exits();
      check_user().then(console.log).catch(console.log);
    }
    if (addrses?.length && account === false) {
      naviagte("/onboard");
    }
    if (addrses?.length && account === true) {
    }
  }, [addrses, account]);
  return (
    <>
      <ButtonGroup variant="flat">
        {addrses?.length && account === null ? (
          <Button endContent={<Spinner />}>Loading ...</Button>
        ) : addrses === null && account === null ? (
          <>
            <Button
              endContent={
                //   _type === "arconnect" ? (
                //     <ArConnect />
                //   ) : _type === "arweave.app" ? (
                //     <Arweave />
                //   ) : _type === "metamask" ? (
                //     <Metamask />
                //   ) : _type === "othent" ? (
                //     <Othent />
                //   ) : _type === "injectedWallet" ? (
                //     <InjectedWallet />
                //   ) : null
                <ArConnect />
              }
              onClick={() => {
                connect();
              }}
            >
              Connect with ArConnect
            </Button>{" "}
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly>
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                //   defaultSelectedKeys={[_type]}
                aria-label="Merge options"
                //   selectedKeys={[_type]}
                selectionMode="single"
                //   onSelectionChange={
                //     // (e) =>
                //     // ([...e][0] as string) === "arweave.app"
                //     //   ? setType("arweave.app")
                //     //   : ([...e][0] as string) === "metamask"
                //     //   ? setType("metamask")
                //     //   : ([...e][0] as string) === "othent"
                //     //   ? setType("othent")
                //     //   : ([...e][0] as string) === "arconnect"
                //     //   ? setType("arconnect")
                //     //   : ([...e][0] as string) === "injectedWallet"
                //     //   ? setType("injectedWallet")
                //     //   : null
                //   }
                className="max-w-[300px]"
              >
                <DropdownItem
                  key="arconnect"
                  endContent={<ArConnect />}
                  showDivider={true}
                >
                  Connect with arconnect
                </DropdownItem>
                <DropdownItem
                  showDivider={true}
                  key="arweave.app"
                  endContent={<Arweave />}
                  isDisabled
                >
                  Connect with arweave.app
                </DropdownItem>
                <DropdownItem
                  key="othent"
                  showDivider={true}
                  endContent={<Othent />}
                  isDisabled
                >
                  Connect with othent
                </DropdownItem>
                <DropdownItem
                  isDisabled
                  key="metamask"
                  endContent={<Metamask />}
                  showDivider={true}
                >
                  Connect with metamask
                </DropdownItem>
                <DropdownItem
                  key="injectedWallet"
                  isDisabled
                  endContent={<InjectedWallet />}
                  showDivider={true}
                >
                  Connect with injectedWallet
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : null}
      </ButtonGroup>
      {addrses?.length && account ? (
        <>
          {console.log("showing")}
          <Avatar />
        </>
      ) : null}
    </>
  );
}
export default NavBar;
