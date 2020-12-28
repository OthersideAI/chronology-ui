export default function CompletionBlock({ id = "NYI", prompts, onChange, idx }) {
 
    return (
        <div className="w-full" onChange={() => onChange(idx, {
            prompt: document.getElementById(`prompt-select-${id}`).value,
            engine: document.getElementById(`engine-select-${id}`).value,
            temperature: document.getElementById(`tempRange-${id}`).value
        })}>
            <h1 className="text-2xl">Completion Block (ID = {id})</h1>

            <div className="flex space-x-4">
                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">
                    <div className="inline-block px-3">
                        <label htmlFor="Prompt" className="block">Prompt:</label>
                        <select className="block" id={`prompt-select-${id}`}>
                            {/* TODO currently generating all prev blocks, is this correct? */}
                            {prompts.map((p, p_idx) => {
                                if (p_idx < idx) return <option key={p_idx}>{`block_${p_idx}`}</option> 
                                return null
                            })}
                        </select>
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
                    <div className="inline-block px-3">
                        <label htmlFor="temp" className="block">Temp:</label>
                        <input type="range" name="temp" min="1" max="100" defaultValue="50" id={`tempRange-${id}`} />
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