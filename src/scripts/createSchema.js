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

// Create schema
const schemaInfo = await client.createSchema({
  name: "test_after",
  data: [{ name: "name", type: "string" }],
});

console.log("Schema created:", schemaInfo);
