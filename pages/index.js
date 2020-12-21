import Head from 'next/head'
import Block from '../components/block'
import PromptBlock from '../components/prompt-block'
import CompletionBlock from '../components/completion-block'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {

  const [blocks, appendBlock] = useState([<PromptBlock id={uuidv4()}/>, <CompletionBlock id={uuidv4()}/>])
  function addBlock (type = "") {
    if (type === "Prompt") appendBlock(blocks => [...blocks, <PromptBlock id={uuidv4()}/>])
    else if (type === "Completion") appendBlock(blocks => [...blocks, <CompletionBlock id={uuidv4()}/>])
  }
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto divide-y-1">
        {blocks}
      </main>
      <button className="fixed bottom-0.5 right-3.5 bg-gray-light hover:bg-gray text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => addBlock("Prompt")}>Add a Prompt Block</button>
      <button className="fixed bottom-0.5 right-4.5 bg-gray-light hover:bg-gray text-gray-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => addBlock("Completion")}>Add a Completion Block</button>

      {/* <footer>
        OthersideAI
      </footer> */}
    </div>
  )
}
