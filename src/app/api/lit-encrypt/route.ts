import { NextResponse } from "next/server";
import { Lit } from "../../../scripts/litEncryption";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jsonData } = body;

    if (!jsonData) {
      return NextResponse.json(
        { error: "jsonData is required" },
        { status: 400 }
      );
    }

    const chain = "sepolia";
    const myLit = new Lit(chain);
    await myLit.connect();

    try {
      const result = await myLit.encryptMessage(JSON.stringify(jsonData));

      if (result) {
        const { ciphertext, dataToEncryptHash } = result;
        console.log("Encrypted Data:", ciphertext);
        return NextResponse.json(
          { ciphertext, dataToEncryptHash },
          { status: 200 }
        );
      } else {
        console.error("Encryption failed.");
        return NextResponse.json(
          { error: "Encryption failed" },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Error in example usage:", error);
      return NextResponse.json({ error: "Encryption failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
