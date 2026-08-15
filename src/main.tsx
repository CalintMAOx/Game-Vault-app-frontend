import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router"

import './index.css'

import App from './App.tsx'
import HomePage from './components/home.tsx'
import Top20list from './components/top20.tsx'
import SettingsPage from "./components/settings.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "top20",
                element: <Top20list />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            }
        ],
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
