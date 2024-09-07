import {
    SignProtocolClient,
    SpMode,
    EvmChains,
    OffChainSignType,
  } from "@ethsign/sp-sdk";
import { Wallet } from "ethers";
  import { privateKeyToAccount } from "viem/accounts";
  const userPrivateKey = Wallet.createRandom().privateKey; // Optional
  const client = new SignProtocolClient(SpMode.OffChain, {
    signType: OffChainSignType.EvmEip712,
    account: privateKeyToAccount(userPrivateKey), // Optional
  });
  
  // Create schema
  const schemaInfo = await client.createSchema({
    name: "xxx",
    data: [{ name: "name", type: "string" }],
  });

  console.log(schemaInfo);
  
  // Create attestation
  const attestationInfo = await client.createAttestation({
    schemaId: "xxxx", // `schemaInfo.schemaId` or other `schemaId`
    data: { name: "a" },
    indexingValue: "xxx",
  });
  
  
  // Revoke attestation
  const attestationId = "xxx";
  const revokeAttestationRes = await client.revokeAttestation(attestationId, {
    reason: "test",
  });

