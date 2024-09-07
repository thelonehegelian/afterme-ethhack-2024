import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
  try {
    const body = await req.json();
    const { ciphertext, encryptedDataHash } = body;

    if (!ciphertext || !encryptedDataHash) {
      return new Response(
        JSON.stringify({
          error: "ciphertext and encryptedDataHash are required",
        }),
        {
          status: 400,
        }
      );
    }

    const responseData = {
      content:
        "Friends, Romans, countrymen, the news of my death is not exagerated.",
      timestamp: "2023-08-07T05:31:12.156888Z",
      bluesky: {
        identifier: "peterhorvath.bsky.social",
        password: "ekz5-oqxb-xg4q-6q73",
      },
      mastodon: {
        client_id: "cFxDuou4jnIpSVUVKyFoDr0v_JUE5HBTSvVRqDddabU",
        client_secret: "Vkh-z9veEorvWIxTmGjssfTPvAkXHbHsJdVoQv33nwE",
        redirect_uri: "urn:ietf:wg:oauth:2.0:oob",
        access_token: "SDpKjmq0Sj1PafJtD94IfLHGqOuyb5-Y5yXrDUNnphE",
      },
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Allow", ["POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
