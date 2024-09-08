import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      timestamp,
      content,
      bluesky,
      mastodon,
      dropbox,
      friendAddr,
      messForFriend,
      makeHookUrl,
      xmtpKey
    } = body;

    // Validate required fields
    if (!timestamp || !content || !friendAddr) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate optional nested objects
    const blueskyValid = bluesky && bluesky.identifier && bluesky.password !== undefined;
    const mastodonValid =
      mastodon &&
      mastodon.client_id &&
      mastodon.client_secret &&
      mastodon.redirect_uri &&
      mastodon.access_token !== undefined;
    const dropboxValid = dropbox && dropbox.accessToken !== undefined;

    if (!blueskyValid || !mastodonValid || !dropboxValid) {
      return NextResponse.json({ error: "Invalid bluesky, mastodon, or dropbox data" }, { status: 400 });
    }

    if (makeHookUrl && blueskyValid && mastodonValid) {
      await sendPostToMakeHookUrl(
        {
          content: content,
          timestamp: timestamp,
          bluesky: bluesky,
          mastodon: mastodon
        },
        makeHookUrl
      )
    }

    if (dropboxValid) {
      deleteDropboxFiles(dropbox.accessToken);
    }

    if (friendAddr && messForFriend && xmtpKey) {
      sendMessage(friendAddr, messForFriend, xmtpKey);
    }


    return NextResponse.json({ message: "Data received successfully", data: body }, { status: 200 });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function sendPostToMakeHookUrl(data: any, makeHookUrl: string) {
  try {
    const response = await fetch(makeHookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `${data.content}`,
        timestamp: data.timestamp,
        bluesky: {
          identifier: data.bluesky.identifier,
          password: data.bluesky.password
        },
        mastodon: {
          client_id: data.mastodon.client_id,
          client_secret: data.mastodon.client_secret,
          redirect_uri: data.mastodon.redirect_uri,
          access_token: data.mastodon.access_token
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send POST request. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error;
  }
}

async function deleteDropboxFiles(accessToken) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Add your base URL or use environment variable

  try {
    const response = await fetch(`${baseUrl}/api/dropbox`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ accessToken })
    });

    if (!response.ok) {
      throw new Error(`Failed to send POST request. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error calling the API:", error);
  }
}

async function sendMessage(recipient, messageContent, xmtpKey) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'; // Add your base URL or use environment variable

  const data = {
    recipient: recipient,
    messageContent: messageContent,
    xmtpKey: xmtpKey,
  };

  try {
    const response = await fetch(`${baseUrl}/api/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error sending message");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
