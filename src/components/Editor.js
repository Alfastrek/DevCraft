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
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike"; // For C, C++, C#, Java
import "codemirror/mode/ruby/ruby";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { runCode, getSubmissionResult, getLanguageId } from "../runCode";
import "../App.css";
import ACTIONS from "../Actions";
import toast from "react-hot-toast"; // Importing react-hot-toast

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("Hello Javascript!");
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [theme, setTheme] = useState("material-ocean");
  const [codelang, setCodelang] = useState("javascript");

  const getInitialCode = (language) => {
    switch (language) {
      case "python":
        return `# Language: Python\n# Created by: Aradhya Shukla\n# (More Features Coming Soon)\n\nprint("Hello Python!")`;
      case "text/x-csrc":
        return `/* Language: C\nCreated by: Aradhya Shukla\n(More Features Coming Soon) */\n\n#include <stdio.h>\nint main() {\n  printf("Hello C!\\n");\n  return 0;\n}`;
      case "text/x-c++src":
        return `/* Language: C++\nCreated by: Aradhya Shukla\n(More Features Coming Soon) */\n\n#include <iostream>\nint main() {\n  std::cout << "Hello C++!" << std::endl;\n  return 0;\n}`;
      case "text/x-csharp":
        return `/* Language: C#\nCreated by: Aradhya Shukla\n(More Features Coming Soon) */\n\nusing System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello C#!");\n  }\n}`;
      case "ruby":
        return `# Language: Ruby\n# Created by: Aradhya Shukla\n# (More Features Coming Soon)\n\nputs "Hello Ruby!"`;
      case "text/x-java":
        return `/* Language: Java\nCreated by: Aradhya Shukla\n(More Features Coming Soon) */\n\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello Java!");\n  }\n}`;
      default:
        return `/* Language: Javascript\nCreated by: Aradhya Shukla\n(More Features Coming Soon) */\n\nconsole.log("Hello Javascript!")`;
    }
  };

  useEffect(() => {
    // Initialize the editor
    editorRef.current = Codemirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: codelang, // Initially set to the default language
        theme: theme,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      }
    );

    editorRef.current.setValue(getInitialCode(codelang));

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

    return () => {
      // Cleanup editor on component unmount
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
    };
  }, []);

  useEffect(() => {
    // Update the editor's mode and initial code when the language changes
    if (editorRef.current) {
      editorRef.current.setOption("mode", codelang);
      editorRef.current.setValue(getInitialCode(codelang)); // Set the initial value
    }
  }, [codelang]);

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
      socket.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        setCodelang(language);
      });
      return () => {
        socket.off(ACTIONS.CODE_CHANGE);
        socket.off(ACTIONS.LANGUAGE_CHANGE);
      };
    }
  }, [socketRef.current]);

  const runCodeHandler = async () => {
    toast.loading("Compiling code...");
    setIsConsoleVisible(true);
    try {
      const code = editorRef.current.getValue();
      const languageId = getLanguageId(codelang);
      // Call runCode function to execute the code
      const submission = await runCode(code, languageId);
      const submissionId = submission.token;
      // Poll for the result
      let result = null;
      while (!result || result.status.description !== "Accepted") {
        result = await getSubmissionResult(submissionId);
        if (
          result.status.description !== "Queued" &&
          result.status.description !== "Processing"
        ) {
          break;
        }
        // Wait before polling again
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      // Output the result
      if (result && result.stdout) {
        setOutput(result.stdout); // Display standard output
        toast.dismiss();
        toast.success("Code compiled successfully!");
      } else if (result && result.stderr) {
        setOutput(result.stderr); // Display standard error
        toast.dismiss();
        toast.error(`Error in code execution: ${result.stderr}`);
      } else if (result && result.compile_output) {
        setOutput(result.compile_output); // Display compilation error
        toast.dismiss();
        toast.error(`Compilation error: ${result.compile_output}`);
      } else {
        setOutput("No output or error.");
        toast.dismiss();
        toast.error("No output or error.");
      }
    } catch (error) {
      setOutput("Error executing code");
      toast.dismiss();
      toast.error("Error executing code!");
    }
  };

  const toggleConsole = () => {
    setIsConsoleVisible((prev) => !prev);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handlecodelangchange = (e) => {
    const newLanguage = e.target.value;
    setCodelang(newLanguage);
    // Emit language change event
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
      roomId,
      language: newLanguage,
    });
  };

  return (
    <>
      <div className="themeSelectorContainer">
        <select
          id="languageSelector"
          className="languageSelector"
          onChange={handlecodelangchange}
          value={codelang}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="text/x-java">Java</option>
          <option value="text/x-csrc">C</option>
          <option value="text/x-c++src">C++</option>
          <option value="text/x-csharp">C#</option>
          <option value="ruby">Ruby</option>
        </select>
        <select
          id="themeSelector"
          className="themeSelector"
          onChange={handleThemeChange}
          value={theme}
        >
          <option value="material-ocean">Material-Ocean</option>
          <option value="dracula">Dracula</option>
          <option value="liquibyte">Liquibyte</option>
          <option value="blackboard">Blackboard</option>
          <option value="duotone-light">Duotone-Light</option>
          <option value="eclipse">Eclipse</option>
        </select>
      </div>
      <textarea id="realtimeEditor"></textarea>

      {/* Button Container */}
      <div className="buttonContainer">
        <button className="runButton" onClick={runCodeHandler}>
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
            <span className="closeIcon">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Editor;
