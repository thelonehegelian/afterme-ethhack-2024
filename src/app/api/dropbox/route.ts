import { Dropbox } from "dropbox";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is required" },
        { status: 400 }
      );
    }

    const dbx = new Dropbox({ accessToken, fetch: fetch });
    const fileList = await dbx.filesListFolder({ path: "" });

    console.log("File list response:", fileList);

    if (
      !fileList.result ||
      !fileList.result.entries ||
      fileList.result.entries.length === 0
    ) {
      return NextResponse.json(
        { message: "No files to delete or invalid response", fileList },
        { status: 200 }
      );
    }

    const filesToDelete = fileList.result.entries.map((file) => ({
      path: file.path_lower,
    }));

    const deleteBatchResponse = await dbx.filesDeleteBatch({
      entries: filesToDelete,
    });

    return NextResponse.json(
      { message: "Files deleted", deleteBatchResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error interacting with Dropbox:", error);
    return NextResponse.json(
      { message: "Error deleting files", error: error },
      { status: 500 }
    );
  }
}
