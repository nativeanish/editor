import { TurboFactory } from "@ardrive/turbo-sdk";
import { ArconnectSigner } from "arbundles/web";

export async function get_turbo() {
  const arconnect_signer = new ArconnectSigner(window.arweaveWallet);
  if (arconnect_signer.publicKey === undefined) {
    await arconnect_signer.setPublicKey();
  }
  //@ts-ignore
  const turbo = TurboFactory.authenticated({ signer: arconnect_signer });
  return turbo;
}
