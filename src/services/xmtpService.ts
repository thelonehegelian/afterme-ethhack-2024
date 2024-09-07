import { Client } from "@xmtp/xmtp-js";
import { InfuraProvider } from "ethers/providers";
import { Wallet, HDNodeWallet } from "ethers/wallet";
import { Contract } from "ethers/contract";

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64); // Decode base64 to binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i); // Convert each char to its byte
  }
  return bytes;
}


const envVars = process.env;
if (!envVars.INFURA_API_KEY || !envVars.EMITER_CONTRACT_ADDRESS) {
  throw new Error(
    "Missing required environment variables: INFURA_API_KEY, EMITER_CONTRACT_ADDRESS"
  );
}

const infuraApiKey = envVars.INFURA_API_KEY;
const emiterContractAddress = envVars.EMITER_CONTRACT_ADDRESS;
const provider = new InfuraProvider("sepolia", infuraApiKey);

const contractAbi = [
  "event MessageScheduled(address indexed recipient, string messageContent)",
];

const contract = new Contract(emiterContractAddress, contractAbi, provider);

const clientOptions = {
  env: "dev",
};

async function initializeXMTP(xmtpKey: string) {
  /*
  return xmtpClient = await Client.create(null, {
    ...clientOptions,
    privateKeyOverride: base64ToUint8Array(xmtpKey),
  });
  */
  return await Client.create(Wallet.createRandom(), { env: "dev" });
}


export async function scheduleMessage(
  recipient: string,
  messageContent: string,
  xmtpKey: string
) {
  try {
    console.log(
      `Scheduled message to ${recipient}: messageContent is not logged here`
    );
    const xmtpClient = await initializeXMTP(xmtpKey);
    const conversation = await xmtpClient.conversations.newConversation(
      recipient
    );
    await conversation.send(messageContent);
  } catch (e) {
    console.error("Error scheduling message:", e);
  }
}

// Event listener, calls the separated function
contract.on(
  "MessageScheduled",
  async (recipient: string, messageContent: string, xmtpKey: string | null) => {
    await scheduleMessage(recipient, messageContent, xmtpKey);
  }
);
