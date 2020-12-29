export default function PromptBlock({ id = "NYI", onChange, prompts , idx}) {
    function getFileContents(fileID, cb) {
        var txtFile = document.getElementById(fileID).files[0];
        if (txtFile) {
            var reader = new FileReader();
            reader.readAsText(txtFile, "UTF-8");
            reader.onload = function (evt) {
                cb(evt.target.result)
            }
            reader.onerror = function (evt) {
                console.log("error reading file.");
            }
        }

    }
    function getFileContentsWrapper (type) {
        if (type == "txt") {
            getFileContents(`txtFile-${id}`, (res) => {
                onChange(idx, { type: "txt", value: res })
            })
        }
        else if (type == "vars") {
            getFileContents(`varsFile-${id}`, (res) => {
                onChange(idx, { type: "vars", value: res })
            })
        }
    }

    return (
        <div className="w-full">
            <h1 className="text-2xl">Prompt Block (ID = {id})</h1>

            <div className="flex space-x-4">
                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">
                    <h1 className="text-2xl">Text</h1>
                    <input type="file" id={`txtFile-${id}`} onChange={() => getFileContentsWrapper("txt")}/>
                </div>
                <div className="flex-none box-border border-4 bg-gray-100 rounded-xl p-8">
                    <h1 className="text-2xl">Variables</h1>
                    <div className="py-2">
                        <input type="file" id={`varsFile-${id}`} onChange={() => getFileContentsWrapper("vars")}/>
                    </div>
                </div>
            </div>
        </div>
    )
}