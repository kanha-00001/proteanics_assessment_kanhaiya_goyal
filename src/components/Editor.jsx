import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Callout from '../extensions/Callout.jsx';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Editor = () => {
  const [editors, setEditors] = useState([]);
  const [activeCallout, setActiveCallout] = useState(null);
  const [activeEditorId, setActiveEditorId] = useState(null);

  const addTextEditor = () => {
    setEditors([...editors, { id: Date.now(), type: 'text' }]);
  };

  const addCalloutEditor = () => {
    const id = Date.now();
    setEditors([...editors, { id, type: 'default' }]);
    setActiveEditorId(id);
  };

  const deleteEditor = (id) => {
    setEditors(editors.filter((editor) => editor.id !== id));
  };

  const setCalloutType = (id, type) => {
    setEditors(editors.map((editor) => (editor.id === id ? { ...editor, type } : editor)));
    setActiveCallout(type);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!e.ctrlKey || activeEditorId === null) return;

      if (e.key === 'f') {
        e.preventDefault();
        setCalloutType(activeEditorId, 'info');
      } else if (e.key === 's') {
        e.preventDefault();
        setCalloutType(activeEditorId, 'tip');
      } else if (e.key === 'd') {
        e.preventDefault();
        setCalloutType(activeEditorId, 'alert');
      } else if (e.key === 'a') {
        e.preventDefault();
        setCalloutType(activeEditorId, 'warning');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEditorId]);

  return (
    <div className="flex flex-col bg-gray-900 min-h-screen w-screen p-4 items-center">
      <h1 className="text-white text-3xl font-bold mb-4">Callout Demo</h1>

      {activeCallout && (
        <div className="text-white text-center mb-2">
          <strong>Current Callout:</strong> {activeCallout}
        </div>
      )}

      <div className="flex flex-col items-center w-full gap-4">
        {editors.map(({ id, type }) => (
          <TextEditor
            key={id}
            id={id}
            type={type}
            setCalloutType={setCalloutType}
            deleteEditor={deleteEditor}
            setActiveEditorId={setActiveEditorId}
          />
        ))}
      </div>

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

// Editor Component
const TextEditor = ({ id, type, setCalloutType, deleteEditor, setActiveEditorId }) => {
  const editor = useEditor({
    extensions: [StarterKit, Callout],
    content: '',
    onUpdate: () => setActiveEditorId(id),
  });

  const bgColors = {
    text: 'bg-gray-800 text-white',
    default: 'bg-gray-800 text-white',
    info: 'bg-blue-500 text-white',
    tip: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    alert: 'bg-red-500 text-white',
  };

  const insertNestedCallout = () => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'callout',
        attrs: { type: 'info', level: 1 },
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Nested callout...' }] }],
      })
      .run();
  };

  return (
    <div
      className={`relative w-3/4 p-4 rounded ${bgColors[type]}`}
      onClick={() => setActiveEditorId(id)}
    >
      <EditorContent editor={editor} className="w-full focus:outline-none" />

      {type !== 'text' && (
        <div className="flex gap-2 mt-2 flex-wrap">
          <button className={`px-3 py-1 rounded ${type === 'info' ? 'bg-blue-700' : 'bg-blue-500'}`} onClick={() => setCalloutType(id, 'info')}>ℹ️ Info</button>
          <button className={`px-3 py-1 rounded ${type === 'tip' ? 'bg-green-700' : 'bg-green-500'}`} onClick={() => setCalloutType(id, 'tip')}>✔️ Tip</button>
          <button className={`px-3 py-1 rounded ${type === 'warning' ? 'bg-yellow-700' : 'bg-yellow-500'}`} onClick={() => setCalloutType(id, 'warning')}>⚠️ Warning</button>
          <button className={`px-3 py-1 rounded ${type === 'alert' ? 'bg-red-700' : 'bg-red-500'}`} onClick={() => setCalloutType(id, 'alert')}>🛡️ Alert</button>

          <button
            className="px-3 py-1 rounded bg-purple-500 text-white"
            onClick={insertNestedCallout}
          >
            ➕ Nested Callout
          </button>
        </div>
      )}

      <div className="absolute top-2 right-2">
        <Button variant="contained" color="error" size="small" onClick={() => deleteEditor(id)}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};

export default Editor;
