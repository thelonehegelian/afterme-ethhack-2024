const express = require("express");
const next = require("next");
const { Client } = require("@xmtp/xmtp-js");
const ethers = require("ethers");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler(); // For handling Next.js pages

const port = 3001;

app.prepare().then(() => {
  const server = express();

  // Middleware to parse JSON bodies
  server.use(express.json());

  // Custom API route
  server.get("/ping", (req, res) => {
    res.send("Pong from Express!");
  });

  // XMTP interaction route
  server.post("/send-message", async (req, res) => {
    try {
      // Create a wallet (in a real app, you'd use an existing wallet)
      const wallet = ethers.Wallet.createRandom();

      // Create the XMTP client
      const client = await Client.create(wallet, {
        env: "production",
        appVersion: "XmtpNodeExample/1.0.0",
      });

      console.log("Client created", client.address);

      // Start a new conversation
      const conversation = await client.conversations.newConversation(
        "0x3F11b27F323b62B159D2642964D94E9E06f7530C"
      );

      // Send a message
      await conversation.send("Hello from Express!");

      // Listen for new messages
      for await (const message of await client.conversations.streamAllMessages()) {
        console.log(`New message from ${message.senderAddress}: ${message.content}`);
      }

      res.send("Message sent and listening for new messages.");
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
