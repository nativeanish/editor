import { useCallback, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Avatar as Avatars,
  Tooltip,
  Input,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import { MdDashboard, MdFiberNew } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import useAccount from "../../../store/useAccount";
import { useLocation, useNavigate } from "react-router-dom";
import useAddress from "../../../store/useAddress";
import { get_turbo } from "../../../utils/turbo";
import Images from "../../../images/png/ardrive.jpg";
import Modals from "../../Template/Modals";
import { USD } from "@ardrive/turbo-sdk";
import { CgProfile } from "react-icons/cg";
function Avatar() {
  const username = useAccount((state) => state.username);
  const name = useAccount((state) => state.name);
  const avatar = useAccount((state) => state.img);
  const navigate = useNavigate();
  const location = useLocation();
  const disconecct = async () => {
    await window.arweaveWallet.disconnect();
    window.location.reload();
  };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const address = useAddress((state) => state.address);
  const [turboToken, setTurboToken] = useState<string>("");
  const get_balance = useCallback(async () => {
    if (!address?.length) {
      return;
    }
    const turbo = await get_turbo();
    const _token = await turbo.getBalance();
    setTurboToken(String(Number(_token.winc) / 1000000000000));
  }, [address]);
  useEffect(() => {
    if (address?.length) {
      get_balance().then().catch(console.log);
    }
  }, [address, get_balance]);
  const buy = () => {
    onOpen();
  };
  const _username = `@${username}`;
  return (
    <>
      {username?.length && name?.length && avatar?.length ? (
        <>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: `https://arweave.net/${avatar}`,
                }}
                className="transition-transform"
                description={_username}
                name={name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{`@${username}`}</p>
              </DropdownItem>
              <DropdownItem
                key="token"
                className="h-14 gap-2"
                endContent={<Avatars src={Images} />}
              >
                <Tooltip content="Buy Turbo Credit">
                  <p className="font-bold" onClick={() => buy()}>
                    {turboToken} $TURBO
                  </p>
                </Tooltip>
              </DropdownItem>
              <DropdownItem
                key="home"
                color="primary"
                isDisabled={location.pathname === "/" ? true : false}
                onClick={() => navigate("/")}
                endContent={<FaHome />}
              >
                Home
              </DropdownItem>
              <DropdownItem
                key="dashboard"
                color="primary"
                onClick={() => navigate("/dashboard")}
                isDisabled={location.pathname === "/dashboard" ? true : false}
                endContent={<MdDashboard />}
              >
                Dashboard
              </DropdownItem>
              <DropdownItem
                key="settings"
                color="primary"
                endContent={<IoMdSettings />}
                isDisabled={true}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="Profile"
                color="primary"
                endContent={<CgProfile />}
                isDisabled={
                  location.pathname === `/@/${username}` ? true : false
                }
                onClick={() => navigate(`/@/${username}`)}
              >
                MyProfile
              </DropdownItem>
              <DropdownItem
                key="editor"
                color="primary"
                isDisabled={location.pathname === "/editor" ? true : false}
                onClick={() =>
                  navigate(`/e/@/${username}/Lorem-ipsum-dolor-sit-amet`)
                }
                endContent={<MdFiberNew />}
              >
                Editor
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => disconecct().then().catch()}
                endContent={<IoLogOutSharp />}
              >
                Disconnect
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modals
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title="Buy Turbo Credit"
            Body={<Body onClose={onClose} />}
          />
        </>
      ) : null}
    </>
  );
}

export default Avatar;
function Body({ onClose }: { onClose: () => void }) {
  const [num, setNum] = useState<number>(0.1);
  const buy = async () => {
    try {
      const turbo = await get_turbo();
      const address = await window.arweaveWallet.getActiveAddress();
      const trans = await turbo.createCheckoutSession({
        owner: address,
        amount: USD(num),
      });
      onClose();
      window.open(trans.url, "_blank");
    } catch (err) {
      console.log(err);
      onClose();
    }
  };
  return (
    <>
      <Input
        label="Price"
        placeholder="0.00"
        labelPlacement="outside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        value={String(num)}
        onChange={(e) => setNum(Number(e.currentTarget.value))}
        endContent={
          <div className="flex items-center">
            <label className="sr-only" htmlFor="currency">
              Currency
            </label>
            <select
              className="outline-none border-0 bg-transparent text-default-400 text-small"
              id="currency"
              name="currency"
            >
              <option key="USD">USD</option>
              <option key="GBP">GBP</option>
              <option key="EUR">EUR</option>
              <option key="INR">INR</option>
            </select>
          </div>
        }
        type="number"
      />
      <Button
        type="button"
        color="primary"
        onClick={() => buy().then(console.log).catch(console.log)}
        endContent={<Avatars src={Images} />}
      >
        Buy Turbo Credits
      </Button>
    </>
  );
}
