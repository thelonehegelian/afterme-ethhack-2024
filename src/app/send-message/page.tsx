import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import {getEnv, loadKeys, storeKeys} from "./helper";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// MetaMask requires requesting permission to connect to the user's account
await provider.send("eth_requestAccounts", []);

const signer = provider.getSigner();

const clientOptions = {
  env: getEnv(),
};

// Get the keys using a valid Signer. Save them somewhere secure.
const address = await signer.getAddress();
let keys = loadKeys(address);
if (!keys) {
  keys = await Client.getKeys(signer, {
    ...clientOptions,
    // we don't need to publish the contact here since it
    // will happen when we create the client later
    skipContactPublishing: true,
    // we can skip persistence on the keystore for this short-lived
    // instance
    persistConversations: false,
  });
  storeKeys(address, keys);
}
