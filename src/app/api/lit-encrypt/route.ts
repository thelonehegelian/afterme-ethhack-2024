import { NextApiRequest, NextApiResponse } from "next";
import { Lit, encryptMessage } from "../../../scripts/litEncryption";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { jsonData } = req.body;

    if (!jsonData) {
      return res.status(400).json({ error: "jsonData is required" });
    }

    const chain = "sepolia";
    const myLit = new Lit(chain);
    await myLit.connect();

    const encryptionResult = await encryptMessage(myLit, jsonData);

    if (encryptionResult) {
      return res.status(200).json(encryptionResult);
    } else {
      return res.status(500).json({ error: "Encryption failed" });
    }
  } catch (error) {
    console.error("Error in encryption route:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
