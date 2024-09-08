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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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

  // Decrypt the message
  async decrypt(ciphertext, dataToEncryptHash) {
    // Get the session signatures
    const sessionSigs = await this.getSessionSignatures();

    // Decrypt the message
    const decryptedString = await LitJsSdk.decryptToString(
      {
        accessControlConditions,
        chain: this.chain,
        ciphertext,
        dataToEncryptHash,
        sessionSigs,
      },
      this.litNodeClient
    );

    // Return the decrypted string
    return { decryptedString };
  }
}

export async function encryptMessage(myLit, jsonData) {
  try {
    const result = await myLit.encryptMessage(JSON.stringify(jsonData));

    if (result) {
      const { encryptedData, encryptedSymmetricKey } = result;
      console.log("Encrypted Data:", encryptedData);
      return result;
    } else {
      console.error("Encryption failed.");
      return null;
    }
  } catch (error) {
    console.error("Error in encryptMessage function:", error);
    return null;
  }
}

export async function decryptMessage(myLit, ciphertext, dataToEncryptHash) {
  try {
    const result = await myLit.decrypt(ciphertext, dataToEncryptHash);

    if (result) {
      const { decryptedString } = result;
      console.log("Decrypted String:", decryptedString);
      return decryptedString;
    } else {
      console.error("Decryption failed.");
      return null;
    }
  } catch (error) {
    console.error("Error in decryptMessage function:", error);
    return null;
  }
}

// Example usage
const chain = "sepolia";
const myLit = new Lit(chain);
await myLit.connect();

// JSON data to encrypt
const jsonData = {
  message: "Hello, World!",
  timestamp: Date.now(),
};

// Encrypt JSON
const encryptionResult = await encryptMessage(myLit, jsonData);

if (encryptionResult) {
  const { ciphertext, dataToEncryptHash } = encryptionResult;
  // Decrypt JSON
  const decryptedMessage = await decryptMessage(
    myLit,
    ciphertext,
    dataToEncryptHash
  );
}
