import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router"

import './index.css'

import App from './App.tsx'
import WelcomePage from './components/welcome.tsx'
import Top20list from './components/top20.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <WelcomePage />,
            },
            {
                path: "top20",
                element: <Top20list />,
            }
        ],
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
