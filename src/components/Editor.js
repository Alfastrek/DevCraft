import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/theme/moxer.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";

const Editor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) return; // If an instance already exists, do nothing

    editorRef.current = Codemirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "moxer",
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
