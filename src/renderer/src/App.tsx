/* eslint-disable prettier/prettier */

import Logo from './assets/img/icon.png'

// Icons
import { FaBell } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="relative w-full h-full">
        <div className="w-[100px] mx-auto mt-[80px]">
          <img src={Logo} alt="icon" />
        </div>
        <div className="flex items-center justify-center flex-col gap-4 log-button mt-8">
          <button
            aria-label="access"
            type="button"
            className="bg-[var(--quicklink-primary)] glow-primary"
          >
            Accedi
          </button>
          <button
            aria-label="register"
            type="button"
            className="bg-transparent border-2 border-[var(--quicklink-primary)] text-primary glow-primary transition-all duration-300"
          >
            Registrati
          </button>
          <button
            aria-label="guest"
            type="button"
            className="text-white opacity-50 text-sm hover:opacity-100 hover:underline transition-all duration-300"
          >
            Entra come ospite
          </button>
        </div>
      </div>

      {/* home, qua sotto */}
      {/* <div className="flex justify-end items-center gap-4 p-5 bg-[var(--quicklink-background)]">
        <button className="text-white text-xl">
          <FaBell />
        </button>
        <button className="bg-primary glow text-white p-2 rounded-md text-xl">
          <FaPlus />
        </button>
      </div> */}
    </>
  )
}

export default App
