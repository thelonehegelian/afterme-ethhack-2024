import { NextResponse } from 'next/server';
const ethers = require("ethers");
const { Client } = require("@xmtp/xmtp-js");

export async function GET() {

  let xmtp = await Client.create(ethers.Wallet.createRandom(), {
    env: "dev",
  });

  const conv = await xmtp.conversations.newConversation("0x93E2fc3e99dFb1238eB9e0eF2580EFC5809C7204");
  const message = await conv.send("gm boa");
  console.log(message);

  return new NextResponse('pong', { status: 200 });
}


