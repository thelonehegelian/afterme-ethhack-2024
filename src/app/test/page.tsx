"use client";
import { SetStateAction, useEffect, useState } from "react";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers/wallet";


export default function SendMessagePage() {
  const [client, setClient] = useState<Client | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      try {

        const xmtpClient = await Client.create(Wallet.createRandom(), { env: "dev" });

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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
