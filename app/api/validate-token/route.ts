import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Check if token exists and is not used
    const stmt = db.prepare(
      "SELECT * FROM registration_links WHERE token = ? AND is_used = 0"
    );
    const link = stmt.get(token);

    if (!link) {
      return NextResponse.json(
        { valid: false, message: "Invalid or already used registration link" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true, guestName: link.guest_name });
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate token" },
      { status: 500 }
    );
  }
}
