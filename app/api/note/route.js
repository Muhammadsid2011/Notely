import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export async function POST(req) {
  try {
    await connectDB();

    const { username, title, desc } = await req.json();

    if (!username || !title || !desc) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const note = new Note({ username, title, desc });
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

    const { searchParams } = new URL(req.url);
    // support both `_id` and `id` query params for single-note lookup
    const id = searchParams.get("_id") || searchParams.get("id");
    const username = searchParams.get("username");

    // If id provided, return the single note
    if (id) {
      const note = await Note.findById(id);
      if (!note) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
      return NextResponse.json(note, { status: 200 });
    }

    // If username provided, return all notes for that user
    if (username) {
      const notes = await Note.find({ username });
      return NextResponse.json(notes, { status: 200 });
    }

    // Neither id nor username provided
    return NextResponse.json(
      { error: "Provide either `id`/_id or `username` query param" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT — Update note by ID
export async function PUT(req) {
  try {
    await connectDB();

    const { id, title, desc } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("_id");

    if (!id) {
      return NextResponse.json({ error: "Note _id query param is required" }, { status: 400 });
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
