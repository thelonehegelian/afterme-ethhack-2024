import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET() {
  // Do whatever you want
  return NextResponse.json({ message: "Test successful" }, { status: 200 });
}
