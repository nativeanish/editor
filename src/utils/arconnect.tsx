import { createPortal } from "react-dom";
import Alert from "../Component/Template/Alert";
import useAddress from "../store/useAddress";
export const async_connect = async () => {
  try {
    await window.arweaveWallet.connect(
      [
        "ACCESS_ADDRESS",
        "ACCESS_ALL_ADDRESSES",
        "ACCESS_ARWEAVE_CONFIG",
        "ACCESS_PUBLIC_KEY",
        "DECRYPT",
        "ENCRYPT",
        "DISPATCH",
        "SIGNATURE",
        "SIGN_TRANSACTION",
      ],
      {
        name: "verses.studio",
      }
    );
    checkConnection();
  } catch (err) {
    createPortal(
      <Alert title="Error" descrption={String(err)} />,
      document.body
    );
  }
};
export const connect = () => {
  async_connect().then().catch(console.log);
};
export const checkConnection = async () => {
  window.arweaveWallet
    .getActiveAddress()
    .then((data) => {
      if (data.length) {
        useAddress.getState().setAddress();
      }
    })
    .catch(() => {
      // useAddress.getState().setAddress();
      // useAccount.getState().set_Account(false);
    });
};
