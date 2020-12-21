import Dropdown from './dropdown'

export default function PromptBlock({ id = "NYI" }) {
    return (
        <div className="w-full">
            <h1 className="text-2xl">Prompt Block (ID = {id})</h1>

            <div className="flex space-x-4">
                <div className="flex-grow box-border border-4 bg-gray-100 rounded-xl p-8">
                <h1 className="text-2xl">Text</h1>
                    <input type="file"/>
                </div>
                <div className="flex-none box-border border-4 bg-gray-100 rounded-xl p-8">
                    <h1 className="text-2xl">Variables</h1>
                    <div className="py-2">
                        <input type="file"/>
                    </div>

                </div>
                {/* <button class="flex-noe mr-5 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg">Save Block</button> */}
            </div>
        </div>
    )
}