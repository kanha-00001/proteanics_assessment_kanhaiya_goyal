import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import React from 'react';

// React component to render the callout block
const CalloutComponent = (props) => {
  const { node, updateAttributes } = props;
  const { type = 'info', level = 0 } = node.attrs;

  const styles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-900',
    },
    tip: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-900',
    },
    alert: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-900',
    },
  };

  const current = styles[type] || styles.info;

  const types = ['info', 'tip', 'warning', 'alert'];

  return (
    <NodeViewWrapper
      className={`rounded-md border-l-4 p-4 mb-2 relative ${current.bg} ${current.border} ${current.text}`}
      style={{ marginLeft: `${level * 20}px` }}
    >
      <div className="font-semibold capitalize mb-2">{type} Callout</div>
      
      <div className="absolute top-1 right-2 flex gap-1">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => updateAttributes({ type: t })}
            className={`text-xs px-2 py-1 rounded ${
              type === t ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <NodeViewContent as="div" className="prose prose-sm" />
    </NodeViewWrapper>
  );
};


// Callout node extension
const Callout = Node.create({
  name: 'callout',

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      type: {
        default: 'info',
      },
      level: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-callout': 'true' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },
});

export default Callout;
