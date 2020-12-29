import Head from 'next/head'
import PromptBlock from '../components/prompt-block'
import CompletionBlock from '../components/completion-block'
import SearchBlock from "../components/search-block";
import { useState, useEffect } from 'react'
import CodeBlock from './code-block';

export default function Home() {
  const completionDefault = {
    prompt: 'block_0',
    engine: 'ada',
    temperature: 50,
    topP: 50
  }

  const promptDefault = { "txt": "None" }

  const searchDefault = null

  const [completions, setCompletions] = useState({
    "block_1": completionDefault
  })
  const [prompts, setPrompts] = useState({
    "block_0": promptDefault
  })
  const [searches, setSearches] = useState({})
  const [blocks, appendBlock] = useState(['prompt', 'completion'])
  let [codeBlock, setCodeBlock] = useState(null)

  const [promptIDs, addPromptID] = useState(new Set().add('block_0'))

  const [isMenuOpen, setMenu] = useState(false)



  function appendCompletion(idx, val) {
    setCompletions({ ...completions, [`block_${idx}`]: val })
    addPromptID(new Set([...promptIDs, `block_${idx}`]))
  }

  function appendPrompts(idx, val) {
    setPrompts({ ...prompts, [`block_${idx}`]: { ...prompts[`block_${idx}`], [val.type]: val.value } })
    addPromptID(new Set([...promptIDs, `block_${idx}`]))
  }

  function appendSearch(idx, val) {
    setSearches({ ...searches, [`block_${idx}`]: val })
    addPromptID(new Set([...promptIDs, `block_${idx}`]))
  }


  function addBlock(type = "") {
    if (type === "Prompt") appendBlock(blocks => [...blocks, 'prompt'])
    else if (type === "Completion") appendBlock(blocks => [...blocks, 'completion'])
    else if (type === "Search") appendBlock(blocks => [...blocks, 'search'])
  }
  function showMenu() {
    setMenu(!isMenuOpen)
  }

  // useEffect(() => console.log(promptIDs), [promptIDs]);
  // useEffect(() => console.log(prompts), [prompts]);
  // useEffect(() => console.log(completions), [completions]);
  // useEffect(() => console.log(searches), [searches])

  // TODO try/catch
  function generatePython() {
    const vals = []
    for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i]
      if (block === "prompt") {
        vals.push({ "prompt": prompts[`block_${i}`] })
      } else if (block === "completion") {
        vals.push({ "completion": completions[`block_${i}`] })
      } else if (block === "search") {
        vals.push({ "search": searches[`block_${i}`] })
      }
    }

    let pythonCode = `from chronological import main, read_prompt, gather, fetch_max_search_doc, cleaned_completion\n\n\nasync def logic():\n`
    for (let i = 0; i < vals.length; i++) {
      let val = vals[i]
      if (Object.keys(val)[0] === "completion") {
        const cmpl = val["completion"]
        if (cmpl !== undefined) {
          if (prompts[cmpl["prompt"]] === undefined) {
            pythonCode += `\tblock_${i} = await cleaned_completion(${cmpl["prompt"]}, engine="${cmpl["engine"]}", temperature=${cmpl["temperature"] / 100}, top_p=${cmpl["topP"] / 100})\n`
          } else {
            if (prompts[cmpl["prompt"]]["vars"] === undefined) {
              pythonCode += `\tblock_${i} = await cleaned_completion(${JSON.stringify(prompts[cmpl["prompt"]]["txt"])}, engine="${cmpl["engine"]}", temperature=${cmpl["temperature"] / 100}, top_p=${cmpl["topP"] / 100})\n`
            } else {
              let cleanedVars = prompts[cmpl["prompt"]]["vars"].split('\n').map(vr => `\"` + vr + `\"`).join(',') // TODO is this caused by newline?
              pythonCode += `\tblock_${i} = await cleaned_completion(${JSON.stringify(prompts[cmpl["prompt"]]["txt"])}.format(${cleanedVars}), engine="${cmpl["engine"]}", temperature=${cmpl["temperature"] / 100}, top_p=${cmpl["topP"] / 100})\n`
            }
          }
        } else {
          pythonCode += `\t# Error: None for block_${i}, please edit its values first!\n`
        }

      }
      // TODO add search with prev blocks functionality AND other fields AND remove blocks from list
      else if (Object.keys(val)[0] === "search") {
        const srch = val["search"]
        if (srch !== undefined) {
          // TODO n and min score cutoff
          pythonCode += `\tblock_${i} = await fetch_max_search_doc("${srch["query"]}", ${srch["docs"]}, engine="${srch["engine"]}", n=1, min_score_cutoff=0)\n`
        } else {
          pythonCode += `\t# Error: None for block_${i}, please edit its values first!\n`
        }
      }
    }

    pythonCode += `\n\nmain(logic)`

    setCodeBlock(<CodeBlock pyVal={pythonCode} />)
  }

  return (
    <div className="container mx-auto px-2 py-1">
      <Head>
        <title>Chronology</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="divide-y-1">
        {blocks.map((block, idx) => {
          if (block === "prompt") {
            return (<PromptBlock id={`block_${idx}`} onChange={appendPrompts} prompts={prompts} idx={idx} />)
          }
          else if (block === "completion") {
            return (<CompletionBlock id={`block_${idx}`} onChange={appendCompletion} idx={idx} prompts={Array.from(promptIDs)} />)
          }
          else if (block === "search") {
            return (<SearchBlock id={`block_${idx}`} onChange={appendSearch} idx={idx} />)
          }
        })}
        {codeBlock}
      </main>

      <div className="fixed bottom-1.5 right-1.5 z-50">
        <div id="myDropdown" className={isMenuOpen ? "pb-2" : "hidden"}>
          <a className="block border-b-2 border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#" onClick={() => addBlock("Prompt")} >Add a Prompt Block</a>
          <a className="block border-b-2 border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#" onClick={() => addBlock("Completion")}>Add a Completion Block</a>
          <a className="block border-b-2 border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#" onClick={() => addBlock("Search")}>Add a Search Block</a>
          <a className="block  border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#" onClick={() => generatePython()}>Generate Python Code</a>
        </div>
        <button className="float-right bg-blue-300 hover:bg-blue-500 text-2xl font-bold py-1 px-4 rounded-full inline-flex items-center" onClick={() => showMenu()}>+</button>
      </div>
    </div>
  )
}
