import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  const folders = [
    { name: 'assets', desc: 'Images, fonts, icons' },
    { name: 'components', desc: 'Reusable UI components' },
    { name: 'layout', desc: 'Header, Footer, etc.' },
    { name: 'pages', desc: 'Application routes' },
    { name: 'features', desc: 'Feature-based modules' },
    { name: 'hooks', desc: 'Custom React hooks' },
    { name: 'context', desc: 'Global state contexts' },
    { name: 'redux', desc: 'Redux store/slices' },
    { name: 'services', desc: 'API calls' },
    { name: 'utils', desc: 'Helper functions' },
  ]

  return (
    <div className="container">
      <div className="logo-container">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Project Initialized</h1>

      <div className="card">
        <p>
          I have set up your React project with the structure you requested.
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>

      <div className="structure-grid">
        {folders.map(folder => (
          <div key={folder.name} className="structure-item">
            <code>src/{folder.name}/</code>
            <p style={{ fontSize: '0.8rem', margin: '0.5rem 0 0' }}>{folder.desc}</p>
          </div>
        ))}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
