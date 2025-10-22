import { NextResponse } from "next/server";
import { db, COLLECTIONS } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { valid: false, error: "Firebase not configured" },
        { status: 500 }
      );
    }

    const { token } = await request.json();

    // Check if token exists and is not used
    const linkDoc = await db.collection(COLLECTIONS.REGISTRATION_LINKS).doc(token).get();

    if (!linkDoc.exists) {
      return NextResponse.json(
        { valid: false, message: "Invalid registration link" },
        { status: 400 }
      );
    }

    const linkData = linkDoc.data();
    
    if (linkData?.is_used) {
      return NextResponse.json(
        { valid: false, alreadyRegistered: true, message: "Registration link has already been used" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true, guestName: linkData?.guest_name });
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      { valid: false, error: "Failed to validate token" },
      { status: 500 }
    );
  }
}
