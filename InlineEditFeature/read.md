Core Components
1. Text Selection Tracking: Use “editor.state.selection” to capture the selected content. The selection can span across nodes, and we need to extract the raw HTML or structured JSON..
2. The shortcut Binding: Use Tiptap’s addKeyboardShortcuts() or a custom DOM keydown listener to detect the shortcut.
3. Instruction That Floats Input UI: 
    -When shortcut is triggered:
        •	Inject a floating UI (React component) near the selection using a ProseMirror Decoration or a NodeView.
        •	This UI lets the user type instructions like “Make this shorter” or “Improve grammar”.
4. Extracting & Serializing Selection: 
    -On submission:
        •	Extract the current selection using state.doc.slice(from, to) (range from selection).
        •	Serialize it into HTML or plain text for LLM input.
        •	Also keep the original JSON or node data for reinsertion
5. LLM Interaction: Get recommendations by calling the backend with content and instructions. We can use chatgpt’s api or Deepseek api’s 
6. Diffing the Suggestion: Make use of the diff library or diff-match-patch to generate insertion and deletion.
7. Showing the Diff View: Use marks to show deletions in red and insertions in green.
8. Accept/Reject UI: Offer buttons for applying or removing modifications.

ProseMirror Tools Used
    - state.selection: Get selection range.
    - commands.insertContentAt(): Apply content edits.
    - Decorations: Render floating UI or highlights.
    - Marks: Visualize inline changes.
    - NodeViews: For floating toolbar or custom buttons.

Data Flow
    1. User highlights content and uses a shortcut key.
    2. Floating UI appears and user types an instruction.
    3. API call sends instruction + content.
    4. Diff view is rendered with accept/reject options.
    5. Final content is inserted into the editor.

Edge Cases & Handling
    1.	If no text selected =>Don't trigger inline edit 
    2.	Incompatible node selection =>Disable or split 
    3.	LLM returns invalid HTML=>Sanitize and validate 
    4.	if User cancels =>Revert to original 
    5.	Nested Callout edits => Traverse and serialize recursively 


Technologies and Packages
    - Tiptap for Editor framework
    - ProseMirror for Document model
    - diff-match-patch or diff for Diffing engine
    - React + Tailwind for UI rendering
    - Express or Flask for Backend API
    - OpenAI for LLM provider
