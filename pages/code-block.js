import styles from "../styles/Block.module.css"
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";


export default function LogicBlock(props) {
    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("python");
    const [isEditorReady, setIsEditorReady] = useState(false);

    const pyVal = `def helloPython ():\n\tpass`

    function handleEditorDidMount() {
        setIsEditorReady(true);
      }
    
      function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
      }
    
      function toggleLanguage() {
        setLanguage(language === "javascript" ? "python" : "javascript");
      }

    return (
        <>
            <h3>Choose an Input:</h3>
            <select>
                {props.inputOptions.map(opt => <option>{opt}</option>)}
            </select>
            <br />
            <h3>Choose a Theme:</h3>
            <button onClick={toggleTheme} disabled={!isEditorReady}>
                Toggle theme
      </button>
            <button onClick={toggleLanguage} disabled={!isEditorReady}>
                Toggle language
      </button>

            <Editor
                height="90vh" // By default, it fully fits with its parent
                theme={theme}
                language={language}
                loading={<Loader />}
                value={pyVal}
                editorDidMount={handleEditorDidMount}
                options={{ lineNumbers: "off" }}
            />
        </>
    )
}