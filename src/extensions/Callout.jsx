import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  defining: true,

  addAttributes() {
    return {
      calloutType: {
        default: 'info',
        parseHTML: (element) => element.getAttribute('data-type') || 'info',
        renderHTML: (attributes) => ({
          'data-type': attributes.calloutType,
          class: `p-3 rounded ${getCalloutColor(attributes.calloutType)}`,  // Correct dynamic class assignment
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'callout[data-type]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['callout', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleCallout:
        (calloutType) =>
        ({ commands }) => {
          return commands.updateAttributes('callout', { calloutType });
        },
    };
  },
});

// ✅ Function to return Tailwind color classes dynamically
const getCalloutColor = (type) => {
  switch (type) {
    case 'info':
      return 'bg-blue-200 text-blue-900 border-l-4 border-blue-500';
    case 'tip':
      return 'bg-green-200 text-green-900 border-l-4 border-green-500';
    case 'warning':
      return 'bg-yellow-200 text-yellow-900 border-l-4 border-yellow-500';
    case 'alert':
      return 'bg-red-200 text-red-900 border-l-4 border-red-500';
    default:
      return 'bg-gray-200 text-gray-900 border-l-4 border-gray-500';
  }
};
