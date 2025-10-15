import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token, guestName, email, phone, guestsCount, dietaryRestrictions, message } = await request.json();

    // Validate token first
    const checkStmt = db.prepare(
      "SELECT * FROM registration_links WHERE token = ? AND is_used = 0"
    );
    const link = checkStmt.get(token);

    if (!link) {
      return NextResponse.json(
        { success: false, error: "Invalid or already used registration link" },
        { status: 400 }
      );
    }

    // Insert registration
    const insertStmt = db.prepare(
      `INSERT INTO registrations (token, guest_name, email, phone, guests_count, dietary_restrictions, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );
    insertStmt.run(token, guestName, email, phone, guestsCount, dietaryRestrictions, message);

    // Mark link as used
    const updateStmt = db.prepare(
      "UPDATE registration_links SET is_used = 1 WHERE token = ?"
    );
    updateStmt.run(token);

    return NextResponse.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering guest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register" },
      { status: 500 }
    );
  }
}
