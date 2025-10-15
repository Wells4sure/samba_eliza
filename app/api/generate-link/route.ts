import { NextResponse } from "next/server";
import { db, COLLECTIONS } from "@/lib/firebase";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Firebase not configured. Please set up environment variables." },
        { status: 500 }
      );
    }

    const { guestName } = await request.json();

    // Generate a unique token
    const token = randomBytes(16).toString("hex");

    // Insert into Firestore
    await db.collection(COLLECTIONS.REGISTRATION_LINKS).doc(token).set({
      token,
      guest_name: guestName || null,
      created_at: new Date(),
      is_used: false,
    });

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
