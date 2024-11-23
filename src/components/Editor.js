/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTerminal } from "@fortawesome/free-solid-svg-icons";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [theme, setTheme] = useState("material-ocean");
  const initialCode = `/*
  Language Supported: Javascript
  Created by: Aradhya Shukla
  (More Features Coming Soon) 
*/

 //Enjoy Your Code - 
  `;

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: theme,
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );
      editorRef.current.setValue(initialCode);

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
  }, []);

  // Update the theme when the theme state changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setOption("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;
      socket.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });

      return () => {
        socket.off(ACTIONS.CODE_CHANGE);
      };
    }
  }, [socketRef.current]);

  const runCode = () => {
    try {
      setIsConsoleVisible(true);
      const log = console.log;
      const logs = [];
      console.log = (msg) => logs.push(msg);

      // Evaluate the code
      const code = editorRef.current.getValue();
      // eslint-disable-next-line no-eval
      eval(code);

      console.log = log;
      setOutput(logs.join("\n"));
    } catch (e) {
      setOutput(e.toString());
    }
  };

  const toggleConsole = () => {
    setIsConsoleVisible((prev) => !prev);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <>
      <div className="themeSelectorContainer">
        {" "}
        <select
          id="themeSelector"
          className="themeSelector"
          onChange={handleThemeChange}
          value={theme}
        >
          {" "}
          <option value="material-ocean">Material-Ocean</option>{" "}
          <option value="dracula">Dracula</option>{" "}
          <option value="liquibyte">Liquibyte</option>{" "}
          <option value="blackboard">Blackboard</option>{" "}
          <option value="duotone-light">Duotone-Light</option>{" "}
          <option value="eclipse">Eclipse</option>{" "}
        </select>
      </div>
      <textarea id="realtimeEditor"></textarea>

      {/* Button Container */}
      <div className="buttonContainer">
        <button className="runButton" onClick={runCode}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="consoleButton" onClick={toggleConsole}>
          <FontAwesomeIcon icon={faTerminal} />
        </button>
      </div>

      {/* Console Overlay */}
      {isConsoleVisible && (
        <div className="consoleOverlay">
          <div className="consoleContent">
            <h2>Console Output</h2>
            <pre>{output}</pre>
          </div>
          <button className="toggleConsoleButton" onClick={toggleConsole}>
            <span className="closeIcon">✖</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Editor;
