import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { FillSpinner as Loader } from "react-spinners-kit";


export default function CodeBlock({  pyVal = `def helloPython ():\n\tpass` }) {
    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("python");
    const [isEditorReady, setIsEditorReady] = useState(false);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    return (
        <>
            <Editor
                height="90vh" // By default, it fully fits with its parent
                theme={theme}
                className="pt-5"
                language={language}
                loading={<Loader />}
                value={pyVal}
                editorDidMount={handleEditorDidMount}
                options={{ lineNumbers: "off" }}
            />
        </>
    )
}