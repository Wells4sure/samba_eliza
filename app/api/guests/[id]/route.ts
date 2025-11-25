import { NextResponse } from "next/server";
import { db, COLLECTIONS } from "@/lib/firebase";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Firebase not configured" },
        { status: 500 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Guest ID is required" },
        { status: 400 }
      );
    }

    // Delete the guest document from Firestore
    await db.collection(COLLECTIONS.REGISTRATIONS).doc(id).delete();

    return NextResponse.json({ 
      success: true, 
      message: "Guest deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete guest" },
      { status: 500 }
    );
  }
}