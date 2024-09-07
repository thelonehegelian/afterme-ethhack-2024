import { useEffect, useState } from "react";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
} from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";

const SignProtocolComponent = () => {
  const [schemaResponse, setSchemaResponse] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        const privateKey = process.env.ANNY_PRIVATE_KEY;
        if (!privateKey) {
          console.error("Private key is not set in environment variables");
          return;
        }

        const client = new SignProtocolClient(SpMode.OnChain, {
          chain: EvmChains.polygonMumbai,
          account: privateKeyToAccount(privateKey),
        });

        // Create schema
        const createSchemaRes = await client.createSchema({
          name: "after me app",
          data: [{ name: "name", type: "string" }],
        });

        setSchemaResponse(createSchemaRes);
        console.log(createSchemaRes)
      } catch (error) {
        console.error("Error creating schema:", error);
      }
    };

    initializeClient();
  }, []);

  return (
    <div>
      <h1>Sign Protocol Schema</h1>
      {schemaResponse ? (
        <pre>{JSON.stringify(schemaResponse, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SignProtocolComponent;
