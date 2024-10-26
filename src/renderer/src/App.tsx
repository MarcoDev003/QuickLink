/* eslint-disable prettier/prettier */

import Logo from './assets/img/icon.png'

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
    </>
  )
}

export default App
