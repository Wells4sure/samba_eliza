import { NextResponse } from "next/server";
import { db, COLLECTIONS } from "@/lib/firebase";

export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Firebase not configured" },
        { status: 500 }
      );
    }

    // Fetch all registered guests
    const snapshot = await db
      .collection(COLLECTIONS.REGISTRATIONS)
      .orderBy("registered_at", "desc")
      .get();

    const guests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      registered_at: doc.data().registered_at?.toDate().toISOString(),
    }));

    return NextResponse.json({ success: true, guests });
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
