import fireman from '../assets/fireman.gif'

export default function MobileAdvice() {
  return (
    <div className=" flex md:hidden w-full h-full flex-col justify-center items-center gap-10 bg-stone-600">
      <h2 className=" text-white uppercase font-semibold text-xl">
        Developer Climbing
      </h2>
      <div className="w-full flex flex-col items-center">
        <img src={fireman} alt="Fireman" />
        <p className=" w-3/5 font-semibold text-center text-lime-600">
          Por el momento el desarrollo no es responsive.
        </p>
      </div>
      <p className=" w-3/5 text-center">
        Para visualizarlo mejor y poder jugar es necesario abrir el link en una
        tablet, notebook o desktop.
      </p>
    </div>
  )
}
