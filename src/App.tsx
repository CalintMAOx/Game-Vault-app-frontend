import './App.css'
import Top20list from './components/top20.tsx'
import {SWRConfig} from "swr";

const URL: string = import.meta.env.VITE_SERVER_URL

const globalFetcher = async (path: string) => {
  const res = await fetch(`${URL}${path}`)

  if(!res.ok) {
    throw new Error(`Could not fetch ${path}`)
  }

  return res.json()
}

function App() {
  return (
    <SWRConfig value={{ fetcher: globalFetcher }}>
      <Top20list />
    </SWRConfig>
  )
}

export default App
