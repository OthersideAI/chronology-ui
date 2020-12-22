export default function CompletionBlock({ id = "NYI", prompts = ['123', '4567'], onChange, completions }) {
 
    // TODO add block IDs to form IDs
    return (
        <div className="w-full" onChange={() => onChange({
            prompt: document.getElementById("prompt-select").value,
            engine: document.getElementById("engine-select").value,
            temperature: document.getElementById("tempRange").value
        })}>
            <h1 className="text-2xl">Completion Block (ID = {id})</h1>

            <div className="flex space-x-4">
                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">
                    <div className="inline-block px-3">
                        <label htmlFor="Prompt" className="block">Prompt:</label>
                        <select className="block" id="prompt-select">
                            {prompts.map((p, idx) => <option key={idx}>{p}</option>)}
                        </select>
                    </div>
                    <div className="inline-block px-3">
                        <label htmlFor="engine" className="block">Engine:</label>
                        <select name="engine" className="block" id="engine-select">
                            <option>Ada</option>
                            <option>Babbage</option>
                            <option>Curie</option>
                            <option>Davinci</option>
                        </select>
                    </div>
                    <div className="inline-block px-3">
                        <label htmlFor="temp" className="block">Temp:</label>
                        <input type="range" name="temp" min="1" max="100" defaultValue="50" id="tempRange" />
                    </div>
                    <div className="inline-block px-3">
                        <label htmlFor="temp" className="block">Top P:</label>
                        <input type="range" name="temp" min="1" max="100" defaultValue="50" id="top_pRange" />
                    </div>
                </div>
            </div>
        </div>
    )
}