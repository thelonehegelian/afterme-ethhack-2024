const express = require("express");
const next = require("next");
const { Client } = require("@xmtp/xmtp-js");
const ethers = require("ethers");
require("dotenv").config();

function base64ToUint8Array(base64) {
  const binaryString = Buffer.from(base64, 'base64').toString('binary'); // Use Buffer to handle base64
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i); // Convert each char to its byte
  }
  return bytes;
}

function requireEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const infuraApiKey = requireEnvVar("INFURA_API_KEY");
const emiterContractAddress = requireEnvVar("EMITER_CONTRACT_ADDRESS");
const NETWORK = "sepolia";

const provider = new ethers.InfuraProvider(NETWORK, infuraApiKey);

const contractAbi = [
  "event MessageScheduled(address indexed recipient, string messageContent)",
];

const contract = new ethers.Contract(
  emiterContractAddress,
  contractAbi,
  provider
);

const clientOptions = { env: "dev" };

async function initializeXMTP(xmtpKey) {
  if (!xmtpKey) {
    return await Client.create(ethers.Wallet.createRandom(), clientOptions);
  } else {
    return await Client.create(null, {
      ...clientOptions,
      privateKeyOverride: base64ToUint8Array(xmtpKey),
    });
  }
}

async function scheduleMessage(recipient, messageContent, xmtpKey) {
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

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3001;

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  server.get("/api/ping", (req, res) => {
    res.send("Pong from Express!");
  });

  /*
  contract.on(
    "MessageScheduled",
    async (
      recipient,
      messageContent,
      xmtpKey
    ) => {
      await scheduleMessage(recipient, messageContent, xmtpKey);
    }
  );
  */

  server.post("/api/send-message", async (req, res) => {
    try {
      const { recipient, messageContent, xmtpKey } = req.body;
      await scheduleMessage(recipient, messageContent, xmtpKey);
      res.status(200).send("Message scheduled successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred.");
    }
  });

  // Default handler to allow Next.js to handle all other routes
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
