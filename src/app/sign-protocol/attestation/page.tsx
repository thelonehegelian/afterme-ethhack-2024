import { useEffect, useState } from 'react';
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

const AttestationComponent = () => {
  const [attestationResult, setAttestationResult] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const createAttestation = async () => {
      try {
        const privateKey = process.env.ANNY_PRIVATE_KEY;
        if (!privateKey) {
          console.error("Private key is not set in environment variables");
          return;
        }
        
        const client = new SignProtocolClient(SpMode.OnChain, {
          chain: EvmChains.polygonMumbai,
          account: privateKeyToAccount(privateKey), // Optional if using injected provider
        });

        // Create the attestation
        const createAttestationRes = await client.createAttestation({
          schemaId: "0x3",
          data: { name: "a" },
          indexingValue: "xxx",
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
        <div>Error: {error}</div>
      ) : (
        <div>Creating attestation...</div>
      )}
    </div>
  );
};

export default AttestationComponent;
