import {SWRConfig} from "swr";
import {Link, Outlet} from "react-router";
import {getCurrentWindow} from "@tauri-apps/api/window";

const URL: string = import.meta.env.VITE_SERVER_URL

const globalFetcher = async (path: string) => {
  const res = await fetch(`${URL}${path}`)

  if(!res.ok) {
    throw new Error(`Could not fetch ${path}`)
  }

  return res.json()
}

const appWindow = getCurrentWindow()

function App() {
  return (
    <SWRConfig value={{ fetcher: globalFetcher }}>
        <div className="flex flex-col h-screen">

            {/* Title/Navigation bar */}
            <header
                data-tauri-drag-region
                className="relative h-10 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between select-none"
            >
                {/* Navigation */}
                <nav data-tauri-drag-region className="flex gap-5 pl-5">
                    <Link to="/" className="text-blue-200 hover:text-orange-300 transition-colors no-underline">
                        HOME
                    </Link>
                    <Link to="/top20" className="text-blue-200 hover:text-orange-300 transition-colors no-underline">
                        BROWSE
                    </Link>
                    <Link to="/settings" className="text-blue-200 hover:text-orange-300 transition-colors no-underline">
                        SETTINGS
                    </Link>
                </nav>

                <div
                    data-tauri-drag-region
                    className="absolute left-1/2 -translate-x-1/2 ring-1 ring-gray-500 bg-gray-800 flex h-full items-center text-yellow-500 font-bold"
                >
                    GAME VAULT
                </div>

                {/* Window Controls */}
                <div className="flex h-full">
                    <button
                        onClick={() => appWindow.minimize()}
                        className="w-12 font-bold h-full flex items-center justify-center text-gray-400 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                        −
                    </button>
                    <button
                        onClick={() => appWindow.toggleMaximize()}
                        className="w-12 h-full flex items-center justify-center text-gray-400 hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                        ⯀
                    </button>
                    <button
                        onClick={() => appWindow.close()}
                        className="w-10 font-bold h-full flex items-center justify-center text-gray-400 hover:bg-red-500 hover:text-black transition-colors"
                    >
                        ✕
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto bg-neutral-950 text-white">
                <Outlet />
            </main>

        </div>
    </SWRConfig>
  )
}

export default App
