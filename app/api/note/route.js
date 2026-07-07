import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const { title, desc } = await req.json();

    if (!title || !desc) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const note = new Note({ username: payload.username, title, desc });
    await note.save();

    return NextResponse.json(
      { message: "Note created successfully", note },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ GET — Get all notes by username (?username=john)
export async function GET(req) {
  try {
    await connectDB();

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id") || searchParams.get("id");

    if (id) {
      const note = await Note.findById(id);
      if (!note || note.username !== payload.username) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
      return NextResponse.json(note, { status: 200 });
    }

    const notes = await Note.find({ username: payload.username });
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT — Update note by ID
export async function PUT(req) {
  try {
    await connectDB();

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    verifyToken(token);
    const { id, title, desc } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
    }

    const existingNote = await Note.findById(id);
    if (!existingNote || existingNote.username !== (await verifyToken(token)).username) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, desc },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Note updated successfully", updatedNote },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE — Delete note by ID using query (?_id=...)
export async function DELETE(req) {
  try {
    await connectDB();

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    verifyToken(token);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (!id) {
      return NextResponse.json({ error: "Note _id query param is required" }, { status: 400 });
    }

    const existingNote = await Note.findById(id);
    if (!existingNote || existingNote.username !== (await verifyToken(token)).username) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
