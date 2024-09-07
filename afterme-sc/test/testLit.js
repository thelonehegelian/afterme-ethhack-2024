// Import necessary modules
const LitJsSdk = require("@lit-protocol/lit-node-client");
const { LitAccessControlConditionResource } = require("@lit-protocol/auth-helpers");

class Lit {
  constructor(chain) {
    this.chain = chain;
    this.litNodeClient = null;
  }

  // Connect to the Lit Network
  async connect() {
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: "datil-dev",
    });
    await this.litNodeClient.connect();
  }

  // Encrypt JSON
  async encryptJson(data, contractAddress, expirationTime) {
    const accessControlConditions = [
      {
        contractAddress,
        conditionType: "eth_call",
        chain: this.chain,
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
      {
        conditionType: "timeLessThan",
        chain: this.chain,
        returnValueTest: {
          comparator: "<=",
          value: expirationTime, // Time-based access control
        },
      },
    ];

    const { encryptedData, encryptedSymmetricKey } = await LitJsSdk.encryptToJson({
      data,
      accessControlConditions,
      chain: this.chain,
      litNodeClient: this.litNodeClient,
    });

    return {
      encryptedData,
      encryptedSymmetricKey,
    };
  }
}

// Example usage
(async () => {
  const chain = "ethereum";
  const contractAddress = "0x6E9A7758B24755aB65E287Af0Cf903437CC4FE27";
  const expirationTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  const myLit = new Lit(chain);
  await myLit.connect();

  // JSON data to encrypt
  const jsonData = {
    message: "Hello, World!",
    timestamp: Date.now(),
  };

  // Encrypt JSON
  const { encryptedData, encryptedSymmetricKey } = await myLit.encryptJson(jsonData, contractAddress, expirationTime);
  
  console.log("Encrypted Data:", encryptedData);
  console.log("Encrypted Symmetric Key:", encryptedSymmetricKey);
})();
