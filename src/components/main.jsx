import React, { useState, useEffect } from "react";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    body: "",
    archived: false,
  });

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    const initialData = [
      {
        id: 1,
        title: "Babel",
        body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
        createdAt: "2022-04-14T04:27:34.572Z",
        archived: false,
      },
    ];

    const mergedData = [...initialData, ...savedNotes];

    setNotes(mergedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() !== "" && newNote.body.trim() !== "") {
      setNotes([
        ...notes,
        { ...newNote, id: Date.now(), createdAt: new Date().toISOString() },
      ]);
      setNewNote({ title: "", body: "", archived: false });
      alert("New Note has been created");
    }
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    alert("Note has been deleted");
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">MyNotes</h1>
      <div className="flex justify-center">
        <div className="w-1/3 mb-4 flex flex-col justify-center">
          <h2 className="font-medium text-center text-xl mb-4">
            Input Your Notes Here!
          </h2>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            maxLength={50}
          />
          <textarea
            className="w-full p-2 border rounded mt-2"
            placeholder="Your Notes"
            value={newNote.body}
            onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
          />
          <button
            className=" bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition transform duration-300 mt-4"
            onClick={addNote}
          >
            Add
          </button>
        </div>
      </div>
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center text-3xl mt-20">
          Tidak ada catatan
        </p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center mb-2 border p-3 border-black rounded-2xl"
            >
              <div>
                <h2 className="text-xl">{note.title}</h2>
                <p>{note.body}</p>
                <p>Created At: {note.createdAt}</p>
              </div>
              <button
                className="bg-red-500 text-white py-1 px-6 rounded hover:bg-red-700 transition transform duration-300"
                onClick={() => deleteNote(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Main;
