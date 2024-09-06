import { ethers } from 'ethers';
import { initializeXMTP } from './helper';

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

export async function scheduleMessage(recipient: string, messageContent: string, xmtpKey: string | null) {
    try {
        console.log(`Scheduled message to ${recipient}: messageContent is not logged here`);
        const xmtpClient = await initializeXMTP(xmtpKey);
        const conversation = await xmtpClient.conversations.newConversation(recipient);
        await conversation.send(messageContent);
    } catch (e) {
        console.error('Error scheduling message:', e);
    }
}

// Event listener, calls the separated function
contract.on('MessageScheduled', async (recipient: string, messageContent: string, xmtpKey: string | null) => {
    await scheduleMessage(recipient, messageContent, xmtpKey);
});
