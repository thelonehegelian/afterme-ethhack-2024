const ENCODING = "binary";

export const getEnv = (): "dev" | "production" | "local" => {
  return "dev";
};

export const buildLocalStorageKey = (walletAddress: string) =>
  walletAddress ? `xmtp:${getEnv()}:keys:${walletAddress}` : "";

export const loadKeys = (walletAddress: string): string | null => {
  const val = localStorage.getItem(buildLocalStorageKey(walletAddress));
  return val ? val : null;
};

export const storeKeys = (walletAddress: string, keys: string) => {
  localStorage.setItem(
    buildLocalStorageKey(walletAddress),
    Buffer.from(keys).toString(ENCODING),
  );
};

export const wipeKeys = (walletAddress: string) => {
  // This will clear the conversation cache + the private keys
  localStorage.removeItem(buildLocalStorageKey(walletAddress));
};