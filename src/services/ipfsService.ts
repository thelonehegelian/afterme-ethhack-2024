import { create } from "ipfs-http-client";

// Connect to an IPFS node (you can use a local node or a public gateway)
const client = create("https://ipfs.infura.io:5001/api/v0"); // Infura as an example

export async function addFile(name: string, content: string) {
  const file = { path: name, content: content };
  return await client.add(file);
}

export async function removeFile(cid: string) {
  await client.pin.rm(cid);
  console.log("File unpinned:", cid);
}
