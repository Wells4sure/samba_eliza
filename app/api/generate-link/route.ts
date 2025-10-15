import { NextResponse } from "next/server";
import db from "@/lib/db";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const { guestName } = await request.json();

    // Generate a unique token
    const token = randomBytes(16).toString("hex");

    // Insert into database
    const stmt = db.prepare(
      "INSERT INTO registration_links (token, guest_name) VALUES (?, ?)"
    );
    stmt.run(token, guestName || null);

    const link = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/register/${token}`;

    return NextResponse.json({ success: true, link, token });
  } catch (error) {
    console.error("Error generating link:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate link" },
      { status: 500 }
    );
  }
}
