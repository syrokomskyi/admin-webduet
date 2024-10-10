import { randomInt } from "crypto";
import { NextResponse } from "next/server";

// Simplest test of route.
export async function GET() {
  return new NextResponse("OK " + randomInt(1000000));
}
