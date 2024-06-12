import { useState } from 'react'
import './App.css'
import Climber from './components/Climber'
import { LinkedinIcon } from 'lucide-react'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <main className="relative z-0 w-screen h-screen">
      <div
        className={`${
          isPlaying ? ' scale-0 ' : ' scale-100 '
        } transition-all duration-500 ease-in-out absolute z-50 w-full h-full flex flex-col justify-center items-center gap-20 bg-black/70`}
      >
        <h3 className=" w-1/3 text-center text-white text-6xl font-medium">
          Escalá la <span className=" text-lime-500 font-bold">TORRE</span> y
          convertite en héroe... o senior.
        </h3>
        <p className=" text-3xl text-red-600 animate-pulse">
          Pero tené cuidado con los Bomberos!
        </p>

        <button
          onClick={() => setIsPlaying(true)}
          className=" px-4 py-3 bg-lime-400 text-black text-xl font-black border-2 hover:bg-lime-600 hover:scale-110 hover:text-white transition-all duration-200 ease-in-out border-lime-100 shadow-inner shadow-lime-200  rounded-full"
        >
          Comenzar a Jugar
        </button>
      </div>

      <Climber />
      <div className=" px-4 py-3 flex flex-col items-center gap-4 absolute top-10 right-10 z-50 bg-sky-600 rounded-2xl border-2 border-sky-300 shadow-md shadow-black">
        <p className=" w-2/3 text-center font-normal text-lg text-white">
          Si te gustó, dejá un comentario
        </p>
        <a
          className=" flex items-center justify-center gap-2 w-10 h-10 rounded-xl hover:scale-110 hover:border hover:border-white transition-all duration-200 ease-in-out"
          href="https://linkedin.com/in/marco-tortolani"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon color="#FFF" />
        </a>
      </div>
    </main>
  )
}

export default App
