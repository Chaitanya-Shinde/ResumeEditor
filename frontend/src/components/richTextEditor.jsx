import React, {  useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, Link2 } from 'lucide-react';

const RichTextEditor = ({ initialContent, onContentChange, placeholder = "Start typing your content here..." }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    // Set innerHTML only when the initialContent changes or component mounts
    // This avoids overwriting user edits if the parent state updates for other reasons
    if (editorRef.current && initialContent !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      //setContent(newContent);
      if (onContentChange) {
        onContentChange(newContent);
      }
    }
  };

  // Apply formatting commands
  const applyFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus(); // Keep focus on the editor after applying format
    handleInput(); // Manually trigger content update for React state
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()} // Prevent editor from losing focus
          onClick={() => applyFormat('bold')}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyFormat('italic')}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyFormat('underline')}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          title="Underline"
        >
          <Underline size={18} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyFormat('insertUnorderedList')}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          title="Bulleted List"
        >
          <List size={18} />
        </button>
      
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-3 min-h-[120px] outline-none prose-sm focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all overflow-auto"
        style={{ '--tw-prose-bullets': 'blue' }} // Custom property for prose styling
        dangerouslySetInnerHTML={{ __html: initialContent || placeholder }} // Use placeholder if no initial content
        onFocus={(e) => {
          // Clear placeholder on focus if it's the actual placeholder text
          if (e.target.innerHTML === placeholder) {
            e.target.innerHTML = '';
            //setContent('');
            onContentChange('');
          }
        }}
        onBlur={(e) => {
          // Re-add placeholder if content is empty on blur
          if (e.target.innerHTML.trim() === '') {
            e.target.innerHTML = placeholder;
            //setContent(placeholder); // Keep state consistent
          }
        }}
      ></div>
    </div>
  );
}

export default RichTextEditor

  
