export const PROCESS_ID = "Aa8iyo0uwETZQUmKFwKiHLgYH2Nc-xZuL4C6nsvIOLE";
import useAccount from "../store/useAccount";
import useIntroField from "../store/Onboard/useIntroField";
// import { TurboFactory, USD } from "@ardrive/turbo-sdk/web";
// import { ArconnectSigner, createData } from "arbundles/web";
import { Mem } from "mem-sdk";
import { WebIrys } from "@irys/sdk";
import useAlertLoading from "../store/useAlertLoading";
const TMP_ID = "04312b08-4db7-e74e-feed-32665ad145f6";
// export const check_user_exits = async () => {
//   // const _id = await message({
//   //   process: PROCESS_ID,
//   //   tags: [{ name: "Action", value: "check_user_exits" }],
//   //   signer: createDataItemSigner(window.arweaveWallet),
//   // });
//   // const st = await result({
//   //   process: PROCESS_ID,
//   //   message: _id,
//   // });
//   // const _user: { status: 1 | 0; data: string } = JSON.parse(
//   //   st.Messages[0].Data
//   // );
//   try {
//     const mem = new Mem({ network: "testnet" });
//     const pubkey = await window.arweaveWallet.getActivePublicKey();
//     const input = { function: "check_username", pubKey: pubkey };
//     const result = await mem.write(
//       "2baf2f64-2d12-65ff-0b84-28ce8971564c",
//       input
//     );
//       if (result) {
//       //@ts-ignore
//       useAccount.setState({ account: Boolean(result.result.status) });
//     }
//   } catch (err) {
//     console.log(err);
//   }
//   // useAccount.setState({ account: Boolean(_user.status) });
// };
export const check_username_exists = async (data: string) => {
  // const id = await message({
  //   process: PROCESS_ID,
  //   tags: [
  //     { name: "Action", value: "check_username_handle" },
  //     { name: "username", value: data },
  //   ],
  //   signer: createDataItemSigner(window.arweaveWallet),
  // });
  // const st = await result({
  //   process: PROCESS_ID,
  //   message: id,
  // });
  // console.log(st);
  // const _result: { status: 1 | 0; data: string } = JSON.parse(
  //   st.Messages[0].Data
  // );
  // return Boolean(_result.status);
  useAlertLoading.setState({ title: "Username" });
  useAlertLoading.setState({
    description: "Checking Username",
  });
  useAlertLoading.setState({ show: true });
  try {
    const mem = new Mem({
      network: "testnet",
    });
    const input = { function: "check_username", username: data };
    const result = await mem.write(TMP_ID, input);
    console.log(result);
    if (result) {
      useAlertLoading.setState({ show: false });
      //@ts-ignore
      return Boolean(result.result.status);
    }
  } catch (err) {
    console.log(err);

    useAlertLoading.setState({ show: false });
  }
  useAlertLoading.setState({ show: false });
};

export const register = async () => {
  const name = useIntroField.getState().name;
  const username = useIntroField.getState().username;
  const type = useIntroField.getState().type;
  const data = useIntroField.getState().data;
  if (data?.length && type.length && name.length && username.length) {
    useAlertLoading.setState({ show: true });
    useAlertLoading.setState({
      title: "Registering",
    });
    useAlertLoading.setState({
      description: "Registering User",
    });
    const id = await upload_image();
    const mem = new Mem({
      network: "testnet",
    });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    console.log("regsiter");
    await mem.write(TMP_ID, {
      function: "register",
      username: username,
      name: name,
      img_url: id,
      type: type,
      pubKey: pubkey,
    });

    useAlertLoading.setState({ show: false });
    try {
    } catch (err) {
      console.log(err);
      useAlertLoading.setState({ show: false });
      return false;
    }
    useAlertLoading.setState({ show: false });
    return true;
  }
};

export const upload_image = async () => {
  // const arconnect_signer = new ArconnectSigner(window.arweaveWallet);
  // if (arconnect_signer.publicKey === undefined) {
  //   await arconnect_signer.setPublicKey();
  // }
  // //@ts-ignore
  // const turbo = TurboFactory.authenticated({ signer: arconnect_signer });
  // const address = await window.arweaveWallet.getActiveAddress();
  const data = useIntroField.getState().data;
  const type = useIntroField.getState().type;
  // if (data?.length) {
  //   const { url, winc, paymentAmount, quotedPaymentAmount, adjustments } =
  //     await turbo.createCheckoutSession({
  //       amount: USD(10.0), // $10.00 USD
  //       owner: address,
  //       promoCodes: ["WELCOME20"],

  //       // promo codes require an authenticated client
  //     });
  //   window.open(url);
  //   console.log(url);

  //   // console.log("uploading image", data);
  //   // const ms = createData(data, arconnect_signer);
  //   // const upload = await turbo.uploadSignedDataItem({
  //   //   dataItemStreamFactory: () => ms.getRaw(),
  //   //   dataItemSizeFactory: () => ms.getRaw().length,
  //   // });
  //   // console.log(upload);
  // }
  useAlertLoading.setState({ title: "Uploading Image" });
  useAlertLoading.setState({
    description: "Uploading Image to ArDrive, please wait",
  });
  useAlertLoading.setState({ show: true });
  try {
    const irys = new WebIrys({
      url: "https://turbo.ardrive.io",
      token: "arweave",
      wallet: { provider: window.arweaveWallet },
    });
    await irys.ready();
    if (data?.length && type.length) {
      const trsncation = await irys.upload(data, {
        tags: [{ name: "Content-Type", value: type }],
      });
      console.log(trsncation);
      useAlertLoading.setState({ show: false });
      return trsncation.id;
    }
  } catch (err) {
    console.log(err);
    useAlertLoading.setState({ show: false });
  }
  useAlertLoading.setState({ show: false });
};

export const upload_args = async (data: string, type: "base64" | "json") => {
  useAlertLoading.setState({ title: "Uploading Image" });
  useAlertLoading.setState({
    description:
      "Uploading Image to ArDrive and submitting trasnscation to Mem.sdk, please wait",
  });
  useAlertLoading.setState({ show: true });
  try {
    const irys = new WebIrys({
      url: "https://turbo.ardrive.io",
      token: "arweave",
      wallet: { provider: window.arweaveWallet },
    });
    await irys.ready();
    if (data?.length) {
      const trsncation = await irys.upload(data, {
        tags: [{ name: "Content-Type", value: type }],
      });
      console.log(trsncation);
      useAlertLoading.setState({ show: false });
      return trsncation.id;
    }
  } catch (err) {
    console.log(err);
    useAlertLoading.setState({ show: false });
  }
  useAlertLoading.setState({ show: false });
};

export const _get_tag = async () => {
  try {
    const mem = new Mem({
      network: "testnet",
    });
    const input = { function: "get_tag" };
    const result = await mem.write(TMP_ID, input);
    console.log(result);
    if (result) {
      //@ts-ignore
      return result.result.data;
    }
    console.log(result);
  } catch (Err) {
    console.log(Err);
  }
};
export const register_articles = async (
  id: string,
  title: string,
  udl: string,
  tags: Array<string>
) => {
  try {
    const mem = new Mem({
      network: "testnet",
    });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = {
      function: "register_article",
      pubKey: pubkey,
      id,
      title,
      udl,
      tags,
    };
    const result = await mem.write(TMP_ID, input);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
export const check_user = async () => {
  // try {
  //   const pubkey = await window.arweaveWallet.getActivePublicKey();
  //   const input = `{"function":"change", "name":"arweave"}`;
  //   const result = await axios.post(testnet_ENDPOINT, { input, FUNCTION_ID });
  //   if (result) {
  //     console.log(result.data);
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  try {
    const mem = new Mem({
      network: "testnet",
    });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = { function: "check_user", pubKey: pubkey };
    const result = await mem.write(TMP_ID, input);
    console.log(result);
    if (result) {
      //@ts-ignore
      useAccount.setState({ account: Boolean(result.result.status) });
      //@ts-ignore
      if (Boolean(result.result.status)) {
        //@ts-ignore
        useAccount.setState({ name: result.result.data.name });
        //@ts-ignore
        useAccount.setState({ username: result.result.data.username });
        //@ts-ignore
        useAccount.setState({ username: result.result.data.username });
        //@ts-ignore
        useAccount.setState({ img: result.result.data.img.url });
        //@ts-ignore
        useAccount.setState({ follower: result.result.data.follower });
        //@ts-ignore
        useAccount.setState({ following: result.result.data.following });
        //@ts-ignore
        useAccount.setState({ articles: result.result.data.articles });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const get_User = async (username: string) => {
  try {
    const mem = new Mem({
      network: "testnet",
    });
    const input = { function: "get_user", username };
    const result = await mem.write(TMP_ID, input);
    //@ts-ignore
    if (result.result.status) {
      //@ts-ignore
      return result.result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
export const username_to_address = async (username: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const input = { function: "username_to_address", username: username };
    const result = await mem.write(TMP_ID, input);
    //@ts-ignore
    if (result.result.status) {
      //@ts-ignore
      return result.result.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
export const follow = async (username: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = {
      function: "follow",
      username: username,
      pubKey: pubkey,
    };
    const result = await mem.write(TMP_ID, input);
    console.log(result);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const get_articles = async (title: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const input = {
      function: "get_article",
      title: title,
      article_id: "unknown",
    };
    const result = await mem.write(TMP_ID, input);
    if (result) {
      //@ts-ignore
      return result.result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const upload_Comment = async (text: string, article_id: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    console.log(text, article_id);
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = {
      function: "register_comment",
      pubKey: pubkey,
      content: text,
      article_id: article_id,
    };
    const data = await mem.write(TMP_ID, input);
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const get_user_recom = async () => {
  try {
    const mem = new Mem({ network: "testnet" });
    const input = {
      function: "get_user_recom",
    };
    const result = await mem.write(TMP_ID, input);
    if (result) {
      //@ts-ignore
      return result.result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const get_articles_by_id = async (id: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const input = {
      function: "get_article_by_id",
      id: id,
    };
    const result = await mem.write(TMP_ID, input);
    if (result) {
      //@ts-ignore
      return result.result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const like = async (id: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = {
      function: "like_article",
      pubKey: pubkey,
      id: id,
    };
    console.log("liking");
    const data = await mem.write(TMP_ID, input);
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};

export const get_user_details = async (id: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const input = {
      function: "get_user_by_address",
      id: id,
    };
    const result = await mem.write(TMP_ID, input);
    if (result) {
      //@ts-ignore
      return result.result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const like_comment = async (id: string, article_id: string) => {
  try {
    const mem = new Mem({ network: "testnet" });
    const pubkey = await window.arweaveWallet.getActivePublicKey();
    const input = {
      function: "like_comment",
      pubKey: pubkey,
      id: id,
      article_id: article_id,
    };
    console.log("liking");
    const data = await mem.write(TMP_ID, input);
    console.log(data);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
