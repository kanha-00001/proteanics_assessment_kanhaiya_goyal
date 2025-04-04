import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Callout from '../extensions/Callout.jsx';
import { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Editor = () => {
  const [editors, setEditors] = useState([]);
  const [activeCallout, setActiveCallout] = useState(null); // Track the currently used callout type

  // Function to create a new text editor
  const addTextEditor = () => {
    setEditors([...editors, { id: Date.now(), type: 'text' }]); // 'text' type for normal text area
  };

  // Function to create a new callout editor (initially with default color)
  const addCalloutEditor = () => {
    setEditors([...editors, { id: Date.now(), type: 'default' }]); // 'default' for callout
  };

  // Function to delete an editor
  const deleteEditor = (id) => {
    setEditors(editors.filter((editor) => editor.id !== id));
  };

  // Function to change the callout type and update the activeCallout state
  const setCalloutType = (id, type) => {
    setEditors(editors.map((editor) => (editor.id === id ? { ...editor, type } : editor)));
    setActiveCallout(type); // Update the active callout type
  };

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen w-screen p-4 items-center">
      {/* Heading at the top */}
      <h1 className="text-white text-3xl font-bold mb-4">Callout Demo</h1>

      {/* Display the current callout type */}
      {activeCallout && (
        <div className="text-white text-center mb-2">
          <strong>Current Callout:</strong> {activeCallout}
        </div>
      )}

      {/* Dynamic Editors Container */}
      <div className="flex flex-col items-center w-full gap-4">
        {editors.map(({ id, type }) => (
          <TextEditor key={id} id={id} type={type} setCalloutType={setCalloutType} deleteEditor={deleteEditor} />
        ))}
      </div>

      {/* Buttons should always appear below the last editor */}
      <div className="flex justify-center gap-4 mt-4 w-full">
        <Button variant="contained" onClick={addCalloutEditor} startIcon={<AddIcon />}>
          Callout
        </Button>
        <Button variant="contained" onClick={addTextEditor} startIcon={<AddIcon />}>
          Text
        </Button>
      </div>
    </div>
  );
};

// Component for each text area with callouts
const TextEditor = ({ id, type, setCalloutType, deleteEditor }) => {
  const editor = useEditor({
    extensions: [StarterKit, Callout],
    content: '',
  });

  const bgColors = {
    text: 'bg-gray-800 text-white', // Normal text area
    default: 'bg-gray-800 text-white', // Default callout color
    info: 'bg-blue-500 text-white',
    tip: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    alert: 'bg-red-500 text-white',
  };

  return (
    <div className={`relative w-3/4 p-4 rounded ${bgColors[type]}`}>
      <EditorContent editor={editor} className="w-full focus:outline-none" />

      {/* Callout Buttons (Only for Callout Editors) */}
      {type !== 'text' && (
        <div className="flex gap-2 mt-2">
          <button className={`px-3 py-1 rounded ${type === 'info' ? 'bg-blue-700' : 'bg-blue-500'}`} onClick={() => setCalloutType(id, 'info')}>ℹ️ Info</button>
          <button className={`px-3 py-1 rounded ${type === 'tip' ? 'bg-green-700' : 'bg-green-500'}`} onClick={() => setCalloutType(id, 'tip')}>✔️ Tip</button>
          <button className={`px-3 py-1 rounded ${type === 'warning' ? 'bg-yellow-700' : 'bg-yellow-500'}`} onClick={() => setCalloutType(id, 'warning')}>⚠️ Warning</button>
          <button className={`px-3 py-1 rounded ${type === 'alert' ? 'bg-red-700' : 'bg-red-500'}`} onClick={() => setCalloutType(id, 'alert')}>🛡️ Alert</button>
        </div>
      )}

      {/* Delete Button */}
      <div className="absolute top-2 right-2">
        <Button variant="contained" color="error" size="small" onClick={() => deleteEditor(id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Editor;
