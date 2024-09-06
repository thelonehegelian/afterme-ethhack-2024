import {HDNodeWallet, Wallet} from 'ethers';
import {Client} from '@xmtp/xmtp-js';

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

export async function initializeXMTP(xmtpKey: string | null) {
  let wallet: Wallet | HDNodeWallet | null;
  if (xmtpKey == null) {
    wallet = await initialize_the_random_wallet();
  } else {
    wallet = await initialize_the_wallet_from_key(xmtpKey);
  }
  return await create_a_client(wallet);
}