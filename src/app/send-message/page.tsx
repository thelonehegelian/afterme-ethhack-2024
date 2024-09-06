"use client";  // Mark this as a Client Component

import { SetStateAction, useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { ethers } from "ethers";
import { getEnv, loadKeys, storeKeys } from "./helper";

// Utility to get the Web3 provider from MetaMask
const getProvider = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      const provider = new ethers.BrowserProvider(window.ethereum)
      return provider;
    } catch (error) {
      console.error('User denied account access', error);
      return null;
    }
  } else {
    console.error('MetaMask is not installed');
    return null;
  }
};

export default function SendMessagePage() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        // Initialize the Ethereum provider
        const web3Provider = await getProvider();
        if (!web3Provider) {
          throw new Error('MetaMask provider is unavailable');
        }

        // Set the provider in the state
        setProvider(web3Provider);


        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        const signer = await web3Provider.getSigner();

        // Get the user's wallet address
        const walletAddress = await signer.getAddress();
        setAddress(walletAddress);

        const clientOptions = {
          env: "production",
        };
         
        let keys = loadKeys(walletAddress);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            ...clientOptions,
            skipContactPublishing: true,
            persistConversations: false,
          });
          storeKeys(walletAddress, keys);
        }
        console.log("Kluce: ", keys.toString());
        const xmtpClient = await Client.create(null, {
          ...clientOptions,
          privateKeyOverride: keys,
        });


        setClient(xmtpClient);
      } catch (err) {
        console.error("Error initializing XMTP client", err);
        setError("Failed to initialize client");
      }
    };

    initProvider();
  }, []);  // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1>Send Message Page</h1>
      {provider ? <p>Connected to MetaMask</p> : <p>MetaMask is not installed or user denied access</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
