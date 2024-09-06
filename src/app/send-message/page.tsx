"use client";  // Mark this as a Client Component

import { useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { getEnv, loadKeys, storeKeys } from "./helper";

const SendMessagePage: React.FC = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        // Initialize Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Request permission to connect to the user's wallet
        await provider.send("eth_requestAccounts", []);

        // Get the signer from the provider
        const signer = provider.getSigner();

        // Get the wallet address
        const address = await signer.getAddress();
        setAddress(address);

        // Load keys or generate new ones
        let keys = loadKeys(address);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            env: getEnv(),
            skipContactPublishing: true,
            persistConversations: false,
          });

          // Store keys securely
          storeKeys(address, keys);
        }

        // Create XMTP client
        const xmtpClient = await Client.create(keys, { env: getEnv() });
        setClient(xmtpClient);
      } catch (err) {
        console.error("Error initializing XMTP client", err);
        setError("Failed to initialize client");
      }
    };

    initializeClient();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : client && address ? (
        <p>Connected as: {address}</p>
      ) : (
        <p>Connecting...</p>
      )}
    </div>
  );
};

export default SendMessagePage;
