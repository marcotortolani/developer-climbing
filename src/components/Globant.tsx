import logoGlobant from '../assets/globant-logo.png'
import firemanAlert from '../assets/fireman-alert.gif'

export default function Globant() {
  return (
    <div className=" absolute top-0 z-10 -translate-y-[100%] w-full h-44 flex flex-col items-center">
      <div className=" w-full px-6 py-8 h-2/3 bg-white flex items-center justify-center rounded-2xl">
        <img src={logoGlobant} alt="Globant Logo" />
      </div>
      <div className=" w-full h-full flex justify-between px-4">
        <div className=" w-3 h-full bg-black"></div>
        <div className=" w-3 h-full bg-black"></div>
      </div>
      <div className=" absolute bottom-0 w-full px-4 h-16 overflow-hidden">
        <img
          className=" object-cover h-full"
          src={firemanAlert}
          alt="Fireman Alert"
        />
      </div>
    </div>
  )
}
