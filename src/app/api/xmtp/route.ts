import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import {HDNodeWallet, Wallet} from 'ethers';
import {Client} from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

export async function POST(req: NextApiRequest) {
  try {
    const { recipient, messageContent, xmtpKey } = await req.body.json();

    if (!recipient || !messageContent) {
      return NextResponse.json(
        { error: 'Recipient and messageContent are required.' },
        { status: 400 }
      );
    }

    // Call the function to schedule a message
    await scheduleMessage(recipient, messageContent, xmtpKey || null);

    return NextResponse.json(
      { success: true, message: 'Message scheduled successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function initialize_the_wallet_from_key(xmtpKey: string) {
  const wallet = new Wallet(xmtpKey);
  console.log(`Wallet address: ${wallet.address}`);
  return wallet;
}

async function initialize_the_random_wallet() {
  const wallet = Wallet.createRandom();
  console.log(`Wallet address: ${wallet.address} , private key: ${wallet.privateKey}`);
  return wallet;
}

async function create_a_client(wallet: Wallet | HDNodeWallet) {
  if (!wallet) {
    console.log("Wallet is not initialized");
    return
  }

  const xmtpClient = await Client.create(wallet, { env: "production" });
  console.log("Client created: ", xmtpClient.address);
  return xmtpClient;
}

async function initializeXMTP(xmtpKey: string | null) {
  let wallet: Wallet | HDNodeWallet | null;
  if (xmtpKey == null) {
    wallet = await initialize_the_random_wallet();
  } else {
    wallet = await initialize_the_wallet_from_key(xmtpKey);
  }
  return await create_a_client(wallet);
}

const envVars = process.env;
if (!envVars.INFURA_API_KEY || !envVars.EMITER_CONTRACT_ADDRESS) {
  throw new Error('Missing required environment variables: INFURA_API_KEY, EMITER_CONTRACT_ADDRESS');
}
const infuraApiKey = envVars.INFURA_API_KEY;
const emiterContractAddress = envVars.EMITER_CONTRACT_ADDRESS;

const provider = new ethers.providers.InfuraProvider('sepolia', infuraApiKey);
const contractAbi = [
  'event MessageScheduled(address indexed recipient, string messageContent)'
];

const contract = new ethers.Contract(emiterContractAddress, contractAbi, provider);

async function scheduleMessage(recipient: string, messageContent: string, xmtpKey: string | null) {
    try {
        console.log(`Scheduled message to ${recipient}: messageContent is not logged here`);
        const xmtpClient = await initializeXMTP(xmtpKey);
        const conversation = await xmtpClient.conversations.newConversation(recipient);
        await conversation.send(messageContent);
    } catch (e) {
        console.error('Error scheduling message:', e);
    }
}

/*
// Event listener, calls the separated function
contract.on('MessageScheduled', async (recipient: string, messageContent: string, xmtpKey: string | null) => {
    await scheduleMessage(recipient, messageContent, xmtpKey);
});
*/