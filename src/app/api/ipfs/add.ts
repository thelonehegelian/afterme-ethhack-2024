import type { NextApiRequest, NextApiResponse } from "next";
import { addFile } from "@/services/ipfsService";
import { createHelia } from "helia";
import { unixfs } from "@helia/unixfs";

export default async function POST(req: NextApiRequest) {

    const { content } = req.body.json();

    const helia = await createHelia();
    const fs = unixfs(helia);
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);
  
    const cid = await fs.addBytes(bytes);

    return new Response(cid, { status: 200 });
}



