
export default function Block ({ name = "", inputs = [] }) {
    return(
        <>
            <div className="flex-1 box-border border-4">
                <h1>{name}</h1>
                <select>{inputs.map(inp => <option>{inp}</option>)}</select>
            </div>
        </>
    )
}
