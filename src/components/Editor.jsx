import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Callout from '../extensions/Callout.jsx';
import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Editor = () => {
  const [editors, setEditors] = useState([
    { id: 1, type: 'default' } // Default text area
  ]);

  // Function to create a new text editor
  const addEditor = () => {
    setEditors([...editors, { id: Date.now(), type: 'default' }]);
  };

  // Function to delete a text editor
  const deleteEditor = (id) => {
    setEditors(editors.filter((editor) => editor.id !== id));
  };

  // Function to change the callout type of an editor
  const setCalloutType = (id, type) => {
    setEditors(editors.map((editor) =>
      editor.id === id ? { ...editor, type } : editor
    ));
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen w-screen p-4">
      {/* Dynamic Editors */}
      <div className="flex-grow flex flex-col items-center justify-center gap-4">
        {editors.map(({ id, type }) => (
          <TextEditor
            key={id}
            id={id}
            type={type}
            setCalloutType={setCalloutType}
            deleteEditor={deleteEditor}
          />
        ))}
      </div>

      {/* General Notes (Description) */}
      <div className="w-3/4 mx-auto bg-gray-800 text-white p-4 rounded mt-4">
        <h2 className="text-lg mb-2">General Notes (Callouts won’t work here)</h2>
        <GeneralEditor />
      </div>

      {/* Button to add a new code block */}
      <div className="flex justify-center mt-4">
        <Button variant="contained" onClick={addEditor} startIcon={<AddIcon />}>
          + CODE
        </Button>
      </div>
    </div>
  );
};

// General text editor for description
const GeneralEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Write a description or any information here.</p>',
  });

  return <EditorContent editor={editor} className="w-full bg-gray-700 p-3 rounded" />;
};

// Component for each text area with callouts
const TextEditor = ({ id, type, setCalloutType, deleteEditor }) => {
  const editor = useEditor({
    extensions: [StarterKit, Callout],
    content: '<p>Start typing...</p>',
  });

  const bgColors = {
    default: 'bg-gray-800 text-white',
    info: 'bg-blue-500 text-white',
    tip: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    alert: 'bg-red-500 text-white',
  };

  return (
    <div className={`relative w-3/4 p-4 rounded ${bgColors[type]}`}>
      <EditorContent editor={editor} className="w-full focus:outline-none" />

      {/* Callout Buttons */}
      <div className="flex gap-2 mt-2">
        <button className={`px-3 py-1 rounded ${type === 'info' ? 'bg-blue-700' : 'bg-blue-500'}`} onClick={() => setCalloutType(id, 'info')}>ℹ️ Info</button>
        <button className={`px-3 py-1 rounded ${type === 'tip' ? 'bg-green-700' : 'bg-green-500'}`} onClick={() => setCalloutType(id, 'tip')}>✔️ Tip</button>
        <button className={`px-3 py-1 rounded ${type === 'warning' ? 'bg-yellow-700' : 'bg-yellow-500'}`} onClick={() => setCalloutType(id, 'warning')}>⚠️ Warning</button>
        <button className={`px-3 py-1 rounded ${type === 'alert' ? 'bg-red-700' : 'bg-red-500'}`} onClick={() => setCalloutType(id, 'alert')}>🛡️ Alert</button>
      </div>

      {/* Delete Button on the right */}
      <div className="absolute top-2 right-2">
        <Button variant="contained" color="error" size="small" onClick={() => deleteEditor(id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Editor;
