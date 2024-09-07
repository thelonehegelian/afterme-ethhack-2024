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
  chain: EvmChains.baseSepolia,
  signType: OffChainSignType.EvmEip712,
  account: privateKeyToAccount(userPrivateKey), // Optional
});
// Create attestation
const attestationInfo = await client.createAttestation({
  schemaId: "SPS_fNatykLnvWr6NUOojVa7U", // `schemaInfo.schemaId` or other `schemaId`
  data: { name: "a" },
  indexingValue: "xxx",
});

console.log("Attestation created:", attestationInfo);
