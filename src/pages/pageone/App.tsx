import nodeLogo from "./assets/node.svg"
import { useState } from 'react'
import './App.scss'
import { ipcRenderer } from 'electron'

// console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      pageone
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron + Vite logo to learn more
      </p>
      <div className="flex-center">
        Place static files into the<code>/public</code> folder <img style={{ width: "5em" }} src={nodeLogo} alt="Node logo" />
      </div>
      <button onClick={() => {
        console.log(222);

        ipcRenderer.invoke('open-win', '/pagetwo')
      }}>new window</button>
    </div>
  )
}

export default App
