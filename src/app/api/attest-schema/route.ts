import { NextApiRequest, NextApiResponse } from "next";
import {
  SignProtocolClient,
  SpMode,
  EvmChains,
  OffChainSignType,
} from "@ethsign/sp-sdk";
import { Wallet } from "ethers";
import { privateKeyToAccount } from "viem/accounts";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { data } = body;

    if (!data) {
      return new Response(JSON.stringify({ error: "Data is required" }), {
        status: 400,
      });
    }

    const userPrivateKey = Wallet.createRandom().privateKey; // Optional

    const client = new SignProtocolClient(SpMode.OffChain, {
      signType: OffChainSignType.EvmEip712,
      account: privateKeyToAccount(userPrivateKey), // Optional
    });

    // Create attestation
    const attestationInfo = await client.createAttestation({
      schemaId: body.data, // `schemaInfo.schemaId` or other `schemaId`
      data: { name: data },
      indexingValue: "xxx",
    });

    console.log("Attestation created:", attestationInfo);

    return new Response(JSON.stringify({ attestationInfo }), { status: 200 });
  } catch (error) {
    console.error("Error creating attestation:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
