import { useState } from 'react'

export default function SearchBlock({ id = "NYI", onChange, idx }) {

    const [fileContent, setFileContent] = useState(null)

    function getFileContents(fileID, cb) {
        var txtFile = document.getElementById(fileID).files[0];
        if (txtFile) {
            var reader = new FileReader();
            reader.readAsText(txtFile, "UTF-8");
            reader.onload = function (evt) {
                cb(evt.target.result)
            }
            reader.onerror = function (evt) {
                console.log("error reading file");
            }
        }
    }

    return (
        <div className="w-full" onChange={() => onChange(idx, {
            engine: document.getElementById(`engine-select-${id}`).value,
            query: document.getElementById(`query-${id}`).value,
            docs: fileContent
        })}>

            <h1 className="text-2xl">Semantic Search Block (ID = {id})</h1>

            <div className="flex space-x-4">

                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">

                    <div className="inline-block px-3">
                        <label htmlFor="query" className="block">Query:</label>
                        <input name={`query-${id}`} id={`query-${id}`} />
                    </div>
                    <div className="inline-block px-3">
                        <label htmlFor="docs" className="block">Docs:</label>
                        <input type="file" name="docs" id={`docsFile-${id}`} onChange={() => getFileContents(`docsFile-${id}`, (res) => {
                            setFileContent(res)
                            onChange(idx, {
                                engine: document.getElementById(`engine-select-${id}`).value,
                                query: document.getElementById(`query-${id}`).value,
                                docs: res
                            })
                        })} />
                    </div>
                    <div className="inline-block px-3">
                        <label htmlFor="engine" className="block">Engine:</label>
                        <select name="engine" className="block" id={`engine-select-${id}`}>
                            <option>ada</option>
                            <option>babbage</option>
                            <option>curie</option>
                            <option>davinci</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}