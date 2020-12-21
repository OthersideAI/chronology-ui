export default function CompletionBlock({ id = "NYI" }) {
    return (
        <div className="w-full">
            <h1 className="text-2xl">Completion Block (ID = {id})</h1>

            <div className="flex space-x-4">
                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">
                    <div className="inline-block px-3">
                        <label for="Prompt" className="block">Prompt:</label>
                        <select className="block">
                            <option>123</option>
                            <option>456</option>
                        </select>
                    </div>
                    <div className="inline-block px-3">
                        <label for="engine" className="block">Engine:</label>
                        <select name="engine" className="block">
                            <option>Ada</option>
                            <option>Babbage</option>
                        </select>
                    </div>
                    <div className="inline-block px-3">
                        <label for="temp" className="block">Temp:</label>
                        <input type="range" name="temp" min="1" max="100" value="50" id="myRange" />
                    </div>
                    <div className="inline-block px-3">
                        <label for="temp" className="block">Top P:</label>
                        <input type="range" name="temp" min="1" max="100" value="50" id="myRange" />
                    </div>
                </div>
            </div>
        </div>
    )
}