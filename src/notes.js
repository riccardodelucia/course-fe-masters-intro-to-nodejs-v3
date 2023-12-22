import { insertDB, getDB, saveDB } from "./db.js";

export const newNote = async (note, tags = []) => {
  const newNote = {
    tags,
    id: Date.now(),
    content: note,
  };

  await insertDB(newNote);

  return newNote;
};

export const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};

export const findNotes = async (filter) => {
  const { notes } = await getDB();
  return notes.filter((note) => note.content.toLowerCase().includes(filter.toLowerCase()));
};

export const removeNote = async (id) => {
  const { notes } = await getDB();

  const match = notes.find((note) => note.id === id);

  // this approach is used to allow the method to return undefined if no entry is found with the specified id
  // it would be ok to just filter notes and save them into the db
  if (match) {
    // immutable approach, without polluting notes array but generating a new one
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return id;
  }
  return undefined;
};

export const removeAllNotes = async () => await saveDB({ notes: [] });
