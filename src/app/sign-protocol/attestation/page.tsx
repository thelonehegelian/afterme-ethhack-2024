import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  delegateSignAttestation,
  delegateSignRevokeAttestation,
  delegateSignSchema,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
const privateKey = "0xabc"; // Optional

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.polygonMumbai,
  account: privateKeyToAccount(privateKey), // Optional if you are using an injected provider
});

// Create schema
const createSchemaRes = await client.createSchema({
  name: "xxx",
  data: [{ name: "name", type: "string" }],
});