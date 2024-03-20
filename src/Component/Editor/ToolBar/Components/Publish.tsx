import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FcUpload } from "react-icons/fc";
import Modals from "../../../Template/Modals";
import { useEffect, useState } from "react";
import { get_turbo } from "../../../../utils/turbo";
import usePageHead from "../../../../store/usePageHead";
import { useNavigate } from "react-router-dom";
import useAccount from "../../../../store/useAccount";
import { MdLabel } from "react-icons/md";
import { _get_tag, register_articles, upload_args } from "../../../../utils/ao";
import { USD } from "@ardrive/turbo-sdk";
function Publish() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  //   const publish = async () => {
  //     editor.getEditorState().read(() => {
  //       const json = editor.getEditorState().toJSON().root.children;
  //       console.log(json);
  //       for (let i = 0; i < json.length; i++) {
  //         // //@ts-ignore
  //         // if (json[i].children[0].type === "image") {
  //         //   //@ts-ignore
  //         //   console.log(json[i].children[0].src);
  //         // }
  //         //@ts-ignore
  //         for (let j = 0; j < json[i].children.length; j++) {
  //           //@ts-ignore
  //           if (json[i].children[j].type === "image") {
  //             //@ts-ignore
  //             json[i].children[j].src =
  //               "https://arweave.net/0000000000000000000000000000000000";
  //           }
  //         }
  //       }
  //       console.log(json);
  //     });
  //   };
  return (
    <>
      <Button
        startContent={<FcUpload />}
        onPress={onOpen}
        //   onClick={() => publish().then(console.log).catch(console.log)}
      >
        Publish
      </Button>
      <Modals
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Publish"
        Body={<Body onClose={onClose} />}
      />
    </>
  );
}

export default Publish;
const udl = [
  "None",
  "Allowed-With-Credit",
  "Allowed-With-Indication",
  "Allowed-With-License-Passthrough",
  "Allowed-With-RevenueShare-25%",
  "Allowed-With-RevenueShare-50%",
  "Allowed-With-RevenueShare-75%",
  "Allowed-With-RevenueShare-100",
];
function Body({ onClose }: { onClose: () => void }) {
  const [editor] = useLexicalComposerContext();
  const [price, set_price] = useState(0);
  const [computing, set_computing] = useState(false);
  const [balance, set_balance] = useState(0);
  const [size, setSize] = useState(0);
  const get_tag = async () => {
    console.log("hetting");
    const tags = await _get_tag();
    console.log(tags);
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    console.log(pubkey);
    setTag(tags);
  };
  useEffect(() => {
    const get_price = async () => {
      set_computing(true);
      let _size = 0;
      let _price = 0;
      const turbo = await get_turbo();
      editor.getEditorState().read(async () => {
        const json = editor.getEditorState().toJSON().root.children;
        console.log(json);
        for (let i = 0; i < json.length; i++) {
          // //@ts-ignore
          // if (json[i].children[0].type === "image") {
          //   //@ts-ignore
          //   console.log(json[i].children[0].src);
          // }
          //@ts-ignore
          for (let j = 0; j < json[i].children.length; j++) {
            //@ts-ignore
            if (json[i].children[j].type === "image") {
              const __price = await turbo.getUploadCosts({
                //@ts-ignore
                bytes: [json[i].children[j].src.length],
              });
              //@ts-ignore
              _size += json[i].children[j].src.length;
              //@ts-ignore
              _price += Number(__price[0].winc);
              //@ts-ignore
              json[i].children[j].src =
                "https://arweave.net/0000000000000000000000000000000000";
            }
          }
        }
        const script_price = await turbo.getUploadCosts({
          bytes: [json.length],
        });
        _size += json.length;
        console.log(script_price);
        _price += Number(script_price[0].winc);

        set_price(_price);
        setSize(_size);
        const balance = await turbo.getBalance();
        set_balance(Number(balance.winc));
        set_computing(false);
      });
    };
    get_price()
      .then(() => {
        get_tag().then().catch();
      })
      .catch();
  }, [editor]);
  const buy = async () => {
    const turbo = await get_turbo();
    const address = await window.arweaveWallet.getActiveAddress();
    const fiat_Rate = (await turbo.getFiatRates()).fiat.usd / 1073741824;

    const check_outsession = await turbo.createCheckoutSession({
      amount: USD(fiat_Rate * size >= 5 ? fiat_Rate * size : 5),
      owner: address,
    });
    window.open(check_outsession.url);
  };
  const set_headign = usePageHead((state) => state.set_heading);
  const heads = usePageHead((state) => state.heading);
  const [val, setVal] = useState(heads);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const username = useAccount((state) => state.username);
  const [tag, setTag] = useState<Array<string>>([]);
  const [tag_id, setTag_id] = useState<Array<string>>([]);
  const [_udl, setUdl] = useState<string>("");
  const change = (e: string) => {
    setError(null);
    console.log(e);
    e = e.split("-").join(" ");
    let regex: RegExp = /^[A-Za-z0-9\s]+$/;
    if (regex.test(e)) {
      setVal(e.split(" ").join("-"));
      set_headign(e.split(" ").join("-"));
      navigate(`/@/${username}/${e.split(" ").join("-")}`);
    } else {
      setError("Only Alphabets and Numbers are allowed");
    }
  };
  const upload = async () => {
    editor.getEditorState().read(async () => {
      // const json = editor.getEditorState().toJSON().root.children;
      const json = editor.getEditorState().toJSON();
      console.log(json);
      for (let i = 0; i < json.root.children.length; i++) {
        // //@ts-ignore
        // if (json[i].children[0].type === "image") {
        //   //@ts-ignore
        //   console.log(json[i].children[0].src);
        // }
        //@ts-ignore
        for (let j = 0; j < json.root.children[i].children.length; j++) {
          //@ts-ignore
          if (json.root.children[i].children[j].type === "image") {
            // const __price = await turbo.getUploadCosts({
            //   //@ts-ignore
            //   bytes: [json[i].children[j].src.length],
            // });
            // if (Number(__price[0].winc) <= 260662120) {
            //   _price += 0;
            // } else {
            //   _price += Number(__price[0].winc);
            // }
            const id = await upload_args(
              //@ts-ignore
              json.root.children[i].children[j].src,
              "base64"
            );
            if (id) {
              //@ts-ignore
              json.root.children[i].children[
                j
              ].src = `https://arweave.net/${id}`;
            }
            j;
          }
        }
      }
      const articel_id = await upload_args(JSON.stringify(json), "json");
      // const script_price = await turbo.getUploadCosts({
      //   bytes: [json.length],
      // });
      // console.log(script_price);
      // _price += Number(script_price[0].winc);
      // if (_price <= 260662120) {
      //   set_price(0);
      // } else {
      //   set_price(_price);
      // }
      // const balance = await turbo.getBalance();
      // set_balance(Number(balance.winc));
      if (articel_id) {
        await register_articles(articel_id, heads, _udl, tag_id);
      }
      onClose();
      navigate(`/@/${username}/${val.split(" ").join("-")}`);
    });
  };
  return (
    <>
      {computing ? (
        <>
          <div className="flex items-center justify-center space-x-2">
            <Spinner size="lg" />
            <h5>Calculating the Price</h5>
          </div>
        </>
      ) : (
        <>
          {Boolean(balance - price >= 0 ? true : false) ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <Input
                  type="text"
                  startContent={<MdLabel />}
                  onChange={(e) => change(e.currentTarget.value)}
                  value={val.split(" ").join("-")}
                  color="primary"
                  label="Heading"
                />
                {error && <p className="text-red-500 m-4">{error}</p>}

                <Select
                  label="Select Licensing Type"
                  color="primary"
                  onChange={(e) => setUdl(e.target.value)}
                >
                  {udl.map((e) => (
                    <SelectItem key={e}>{e}</SelectItem>
                  ))}
                </Select>
                <p className="text-sm">
                  To Learn More About UDL License, Click{" "}
                  <a
                    href="https://arweave.app/tx/yRj4a5KMctX_uOmKWCFJIjmY8DeJcusVk6-HzLiM_t8"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Here
                  </a>
                </p>
                <Select
                  label="Set Tags"
                  selectionMode="multiple"
                  placeholder="Select Multiple Tags"
                  // selectedKeys={values}
                  // onChange={handleSelectionChange}
                  onChange={(e) => setTag_id(e.target.value.split(","))}
                >
                  {tag.map((e) => (
                    <SelectItem key={e}>{e}</SelectItem>
                  ))}
                </Select>
                <Button
                  color="primary"
                  size="lg"
                  onClick={() => upload().then(console.log).catch(console.log)}
                >
                  Upload
                </Button>
              </div>
            </>
          ) : (
            <Tooltip
              content={"Not Enough Turbo Token to make this transcation"}
              color="primary"
            >
              <Button
                color="danger"
                size="lg"
                onClick={() => buy().then(console.log).catch(console.log)}
              >
                Insufficient Token, Buy Turbo
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </>
  );
}
