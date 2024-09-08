import { NextRequest, NextResponse } from "next/server";
import { SignProtocolClient, SpMode, OffChainSignType } from "@ethsign/sp-sdk";
import { Wallet } from "ethers";
import { privateKeyToAccount } from "viem/accounts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { data } = body;

    if (!data) {
      return new NextResponse(JSON.stringify({ error: "Data is required" }), {
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

    return new NextResponse(JSON.stringify({ attestationInfo }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating attestation:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
