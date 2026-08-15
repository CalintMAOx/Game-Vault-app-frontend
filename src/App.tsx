import './App.css'
import {SWRConfig} from "swr";
import {Outlet} from "react-router";

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
      <main>
          <Outlet />
      </main>
    </SWRConfig>
  )
}

export default App
