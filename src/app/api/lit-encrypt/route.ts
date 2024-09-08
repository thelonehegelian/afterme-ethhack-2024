import { NextApiRequest, NextApiResponse } from "next";
import { Lit } from "../../../scripts/litEncryption";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { jsonData } = req.body;

    if (!jsonData) {
      return res.status(400).json({ error: "jsonData is required" });
    }

    const chain = "sepolia";
    const myLit = new Lit(chain);
    await myLit.connect();

    try {
      const result = await myLit.encryptMessage(JSON.stringify(jsonData));

      if (result) {
        const { ciphertext, dataToEncryptHash } = result;
        console.log("Encrypted Data:", ciphertext);
        return res.status(200).json({ ciphertext, dataToEncryptHash });
      } else {
        console.error("Encryption failed.");
        return res.status(500).json({ error: "Encryption failed" });
      }
    } catch (error) {
      console.error("Error in example usage:", error);
      return res.status(500).json({ error: "Encryption failed" });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
