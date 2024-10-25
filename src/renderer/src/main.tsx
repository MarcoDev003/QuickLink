/* eslint-disable prettier/prettier */

import './assets/base.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Icons
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";

const closeApp = (): void => {
  window.electron.ipcRenderer.send('close-app')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <button
      type="button"
      className="absolute top-0 left-0 text-white text-2xl m-3 p-2 opacity-50 hover:opacity-100 transition-all duration-300"
      onClick={() => closeApp()}
    >
      <TbLayoutSidebarRightCollapseFilled />
    </button>
    <App />
  </React.StrictMode>
)
