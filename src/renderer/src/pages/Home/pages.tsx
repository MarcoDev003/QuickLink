/* eslint-disable prettier/prettier */

// Icons
import { FaBell } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa6'

function Home(): JSX.Element {
  return (
    <div className="flex justify-end items-center gap-4 p-5 bg-[var(--quicklink-background)]">
      <button className="text-white text-xl">
        <FaBell />
      </button>
      <button className="bg-primary glow text-white p-2 rounded-md text-xl">
        <FaPlus />
      </button>
    </div>
  )
}

export default Home
