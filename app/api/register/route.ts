import { NextResponse } from "next/server";
import { db, COLLECTIONS } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Firebase not configured" },
        { status: 500 }
      );
    }

    const { token, guestName, phone, attendance, guestsCount, familySide, dietaryRestrictions, message } = await request.json();

    // Validate token first
    const linkDoc = await db.collection(COLLECTIONS.REGISTRATION_LINKS).doc(token).get();

    if (!linkDoc.exists || linkDoc.data()?.is_used) {
      return NextResponse.json(
        { success: false, error: "Invalid or already used registration link" },
        { status: 400 }
      );
    }

    // Insert registration
    await db.collection(COLLECTIONS.REGISTRATIONS).add({
      token,
      guest_name: guestName,
      phone: phone || null,
      attendance: attendance || null,
      guests_count: guestsCount,
      family_side: familySide || null,
      dietary_restrictions: dietaryRestrictions || null,
      message: message || null,
      registered_at: new Date(),
    });

    // Mark link as used
    await db.collection(COLLECTIONS.REGISTRATION_LINKS).doc(token).update({
      is_used: true,
    });

    return NextResponse.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering guest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to register" },
      { status: 500 }
    );
  }
}
