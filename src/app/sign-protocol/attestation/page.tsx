"use client";  // This marks the component as a Client Component

import { useEffect, useState } from 'react';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from "@ethsign/sp-sdk";
import { createPublicClient, http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { privateKeyToAccount } from "viem/accounts";

const AttestationComponent = () => {
  const [attestationResult, setAttestationResult] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const createAttestation = async () => {
      try {
        const privateKey = process.env.NEXT_PUBLIC_ANNY_PRIVATE_KEY;
        if (!privateKey) {
          console.error("Private key is not set in environment variables");
          return;
        }
        
        const account = privateKeyToAccount(privateKey);

        const client = new SignProtocolClient(SpMode.OnChain, {
          chain: EvmChains.sepolia,
          account: account, // Optional if using injected provider
        });

        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http()
        })

        const latestNonce = await publicClient.getTransactionCount(account);
        // Create the attestation
        const createAttestationRes = await client.createAttestation({
          schemaId: "0x1ae",
          data: { name: "insurance company" },
          indexingValue: "0x7d9305b0BAB67157b4265a2D56816174d8e0E4c6",
        });

        // Set the result state
        setAttestationResult(createAttestationRes);
      } catch (err) {
        setError(err);
      }
    };

    createAttestation();
  }, []);

  return (
    <div>
      <h1>Create Attestation</h1>
      {attestationResult ? (
        <div>
          <h2>Attestation Result:</h2>
          <pre>{JSON.stringify(attestationResult, null, 2)}</pre>
        </div>
      ) : error ? (
        // Render error message safely
        <div>Error: {error.message || 'Something went wrong.'}</div>
      ) : (
        <div>Creating attestation...</div>
      )}
    </div>
  );
  
};

export default AttestationComponent;


