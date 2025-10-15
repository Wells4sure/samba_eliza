import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // Fetch all registered guests
    const stmt = db.prepare(
      `SELECT id, guest_name, email, phone, guests_count, dietary_restrictions, message, registered_at
       FROM registrations
       ORDER BY registered_at DESC`
    );
    const guests = stmt.all();

    return NextResponse.json({ success: true, guests });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
