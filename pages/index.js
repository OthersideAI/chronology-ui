import Head from 'next/head'
import Block from '../components/block'
import PromptBlock from '../components/prompt-block'
import CompletionBlock from '../components/completion-block'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [completions, setCompletions] = useState([])

  function appendCompletion (val) {
    console.log(val)
  }

  const [blocks, appendBlock] = useState([<PromptBlock id={uuidv4()} />, <CompletionBlock id={uuidv4()} onChange={appendCompletion} completions={completions} />])
  const [isMenuOpen, setMenu] = useState(false)
  function addBlock(type = "") {
    // TODO add list index
    if (type === "Prompt") appendBlock(blocks => [...blocks, <PromptBlock id={uuidv4()} />])
    else if (type === "Completion") appendBlock(blocks => [...blocks, <CompletionBlock id={uuidv4()} onChange={appendCompletion} completions={completions} />])
  }
  function showMenu () {
    setMenu(!isMenuOpen)
  }


  function generatePython() {

  }

  return (
    <div className="container mx-auto px-2 py-1">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="divide-y-1">
        {blocks}
      </main>
      <div className="fixed bottom-1.5 right-1.5 z-50">
        <div id="myDropdown" className={isMenuOpen ? "pb-2" : "hidden"}>
          <a className="block border-b-2 border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#"onClick={() => addBlock("Prompt")} >Add a Prompt Block</a>
          <a className="block border-b-2 border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#" onClick={() => addBlock("Completion")}>Add a Completion Block</a>
          <a className="block  border-blue-600 bg-blue-200 hover:bg-blue-500 p-3 items-center" href="#">Generate Python Code</a>
        </div>
        <button className="float-right bg-blue-300 hover:bg-blue-500 text-2xl font-bold py-1 px-4 rounded-full inline-flex items-center" onClick={() => showMenu()}>+</button>

      </div>

      {/* <button className="z-50 fixed bottom-1.5 right-3.5 bg-gray-300  font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => addBlock("Prompt")}>Add a Prompt Block</button>
      <button className="fixed bottom-1.5 right-4.5 bg-gray-300  font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => addBlock("Completion")}>Add a Completion Block</button> */}
    </div>
  )
}
