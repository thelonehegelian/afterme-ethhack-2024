"use client"
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from "@ethsign/sp-sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function MetaMaskIntegration() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      // MetaMask is installed and we're in the browser
      const connectMetaMask = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);

          const signer = provider.getSigner();
          const account = await signer.getAddress();

          // Initialize SignProtocolClient with MetaMask account
          const clientInstance = new SignProtocolClient(SpMode.OnChain, {
            chain: EvmChains.polygonMumbai,
            account: account, // Pass MetaMask account address here
          });
          setClient(clientInstance);

          // Create schema
          const createSchemaRes = await clientInstance.createSchema({
            name: "after me app",
            data: [{ name: "name", type: "string" }],
          });
          console.log("Schema created: ", createSchemaRes);

          // Create attestation
          const createAttestationRes = await clientInstance.createAttestation({
            schemaId: createSchemaRes.schemaId,
            data: { name: "a" },
            indexingValue: "xxx",
          });

          console.log("Attestation created: ", createAttestationRes);
        } catch (error) {
          console.error("MetaMask connection error:", error);
        }
      };

      connectMetaMask();
    } else {
      console.log('MetaMask is not installed or not in a browser environment!');
    }
  }, []);

  return <div>MetaMask Integration Component</div>;
}
