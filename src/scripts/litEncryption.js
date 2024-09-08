import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import {
  LitAccessControlConditionResource,
  LitAbility,
  createSiweMessageWithRecaps,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";

// Define the Lit class
class Lit {
  constructor(chain) {
    this.chain = chain;
    this.litNodeClient = null;
  }

  // Connect to the Lit Network
  async connect() {
    try {
      this.litNodeClient = new LitJsSdk.LitNodeClient({
        litNetwork: "datil-dev",
      });
      await this.litNodeClient.connect();
    } catch (error) {
      console.error("Error connecting to Lit Network:", error);
    }
  }
  async encryptMessage(message) {
    const accessControlConditions = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];
    // Encrypt the message
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: message,
      },
      this.litNodeClient
    );

    // Return the ciphertext and dataToEncryptHash
    return {
      ciphertext,
      dataToEncryptHash,
    };
  }

  // Get Session Signatures for decryption
  async getSessionSignatures() {
    try {
      if (process.env.NODE_ENV !== "production") {
        const provider = new ethers.providers.Web3Provider(
          process.env.RPC_ENDPOINT
        );
      }
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // Could also be Smart Contract Wallet
      const walletAddress = await signer.getAddress();
      const latestBlockhash = await this.litNodeClient.getLatestBlockhash();

      const authNeededCallback = async (params) => {
        const toSign = await createSiweMessageWithRecaps({
          uri: params.uri,
          expiration: params.expiration,
          resources: params.resourceAbilityRequests,
          walletAddress,
          nonce: latestBlockhash,
          litNodeClient: this.litNodeClient,
        });

        return generateAuthSig({ signer, toSign });
      };

      const sessionSigs = await this.litNodeClient.getSessionSigs({
        chain: this.chain,
        resourceAbilityRequests: [
          {
            resource: new LitAccessControlConditionResource("*"),
            ability: LitAbility.AccessControlConditionDecryption,
          },
        ],
        authNeededCallback,
      });

      return sessionSigs;
    } catch (error) {
      console.error("Error getting session signatures:", error);
    }
  }
}

// Example usage
(async () => {
  const chain = "sepolia";
  const contractAddress = "0xYourContractAddress";
  const expirationTime = Date.now() + 3600 * 1000; // 1 hour from now

  const myLit = new Lit(chain);
  await myLit.connect();

  // JSON data to encrypt
  const jsonData = {
    message: "Hello, World!",
    timestamp: Date.now(),
  };

  // Encrypt JSON
  try {
    const result = await myLit.encryptMessage(JSON.stringify(jsonData));

    if (result) {
      const { encryptedData, encryptedSymmetricKey } = result;
      console.log("Encrypted Data:", encryptedData);
    } else {
      console.error("Encryption failed.");
    }
  } catch (error) {
    console.error("Error in example usage:", error);
  }
})();
