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
          class: `p-3 rounded ${attributes.calloutType}`,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'callout[data-type]' }];
  },

  renderHTML({ node, HTMLAttributes }) {
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
