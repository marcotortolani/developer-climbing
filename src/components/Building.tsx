import { useState, useEffect } from 'react'
import fireman from '../assets/fireman.gif'
import firemanStandup from '../assets/fireman-standup.gif'
import Globant from './Globant'

type Fireman = {
  pos: number
  side: 'left' | 'right' | 'center'
}

const totalFloors = 30

export default function Building({
  buildingPosition,
}: {
  buildingPosition: number
}) {
  return (
    <div className=" w-full h-full absolute top-0 flex justify-center">
      <div className={` edificio relative w-[35%] h-full `}>
        <div
          className={`absolute left-0 bottom-0 w-full bg-stone-700`}
          style={{ transform: `translateY(${buildingPosition}px)` }}
        >
          <Globant />

          {Array.from({ length: totalFloors }).map((_, index) => (
            <Pattern
              key={index}
              floor={index}
              buildingPosition={buildingPosition}
            />
          ))}
        </div>
      </div>
      <div
        className="floor z-0 w-screen h-10 bg-gray-600 absolute bottom-0 left-0 "
        style={{ transform: `translateY(${buildingPosition}px)` }}
      ></div>
      <div
        className="floor -z-10 w-screen h-20 bg-gradient-to-t from-gray-600 to-gray-600/80 absolute bottom-0 left-0"
        style={{ transform: `translateY(${buildingPosition}px)` }}
      ></div>
      <div
        className=" absolute bottom-10 left-24 "
        style={{ transform: `translateY(${buildingPosition}px)` }}
      >
        <img src={firemanStandup} alt="Fireman" />
      </div>
    </div>
  )
}

const Pattern = ({
  floor,
  buildingPosition,
}: {
  floor: number
  buildingPosition: number
}) => {
  const [firemans, setFiremans] = useState<Fireman[]>()

  useEffect(() => {
    const newFiremans: Fireman[] = Array.from({ length: 25 }, () => ({
      pos: Math.floor(Math.random() * totalFloors) + 4,
      side:
        Math.random() < 0.33
          ? 'left'
          : Math.random() < 0.67
          ? 'right'
          : 'center',
    }))

    const correctFiremans = (firemans: Fireman[]): Fireman[] => {
      const uniqueFiremans: Fireman[] = []
      const posMap: Map<number, Set<'left' | 'right' | 'center'>> = new Map()

      firemans.forEach((fireman) => {
        const { pos, side } = fireman
        if (!posMap.has(pos)) {
          posMap.set(pos, new Set([side]))
          uniqueFiremans.push(fireman)
        } else {
          const existingSides = posMap.get(pos)
          if (!existingSides?.has(side)) {
            let newPos = pos
            do {
              newPos = Math.floor(Math.random() * totalFloors) + 4
            } while (posMap.has(newPos))
            posMap.set(newPos, new Set([side]))
            uniqueFiremans.push({ pos: newPos, side })
          }
        }
      })

      return uniqueFiremans
    }

    const correctedFiremans = correctFiremans(newFiremans)

    setFiremans(correctedFiremans)
  }, [])

  return (
    <div className=" relative top-0 w-full h-full flex border-l-4 border-r-4 border-stone-900 ">
      <div className=" z-20 bg-black text-lime-400 w-8 h-6 flex items-center justify-center shadow-md shadow-black absolute left-2 top-2 font-bold font-mono text-xl rounded-md">
        {totalFloors - floor}
      </div>

      <LevelSign
        levelText="trainee"
        message="Pequeño padawan, esto recién comienza, tu eres "
        levelNumber={0}
        exactFloor={totalFloors - floor}
        heightBuilding={buildingPosition}
      />

      <LevelSign
        levelText="junior"
        message="Felicidades, no aflojes ya llegaste a "
        levelNumber={10}
        exactFloor={totalFloors - floor}
        heightBuilding={buildingPosition + 450}
      />

      <LevelSign
        levelText="semi senior"
        message="Vamos! Un poco más de esfuerzo, ya sos "
        levelNumber={20}
        exactFloor={totalFloors - floor}
        heightBuilding={buildingPosition + 400}
      />

      <LevelSign
        levelText="senior"
        message="Han pasado años pero lo lograste, eres "
        levelNumber={30}
        exactFloor={totalFloors - floor}
        heightBuilding={buildingPosition}
      />

      {firemans?.map((fireman, i) => (
        <FiremanWindow
          key={i}
          pos={fireman.pos}
          floor={floor}
          side={fireman.side}
        />
      ))}
      <div className="relative w-1/2 h-[12rem] border-stone-900 border-t-4 bg-gradient-to-r from-stone-600 to-stone-700">
        <div className="absolute w-1/2 inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 clip-triangle-t bg-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 clip-triangle-b bg-gray-500"></div>
        </div>

        <div className="absolute w-1/2 translate-x-[100%] inset-0">
          <div className="absolute left-0 top-0 w-1/2 h-full clip-triangle-l bg-gray-500"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full clip-triangle-r bg-gray-500"></div>
        </div>
      </div>
      <div className="relative w-1/2 translate-x-0 [12rem] border-stone-900 border-t-4 bg-gradient-to-r from-stone-700 to-stone-800">
        <div className="absolute w-1/2 inset-0">
          <div className="absolute top-0 left-0 w-full h-1/2 clip-triangle-t bg-gray-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 clip-triangle-b bg-gray-500"></div>
        </div>
        <div className="absolute w-1/2 translate-x-[100%] inset-0">
          <div className="absolute left-0 top-0 w-1/2 h-full clip-triangle-l bg-gray-500"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full clip-triangle-r bg-gray-500"></div>
        </div>
      </div>
    </div>
  )
}

const FiremanWindow = ({
  pos,
  floor,
  side,
}: {
  pos: number
  floor: number
  side: 'left' | 'right' | 'center'
}) => {
  let sideStyle: string
  switch (side) {
    case 'left':
      sideStyle = 'left-2'
      break
    case 'right':
      sideStyle = 'right-2 -scale-x-100 '
      break
    case 'center':
      sideStyle = ' left-0 translate-x-[100%] '
      break
  }
  return (
    <div
      className={`${
        totalFloors - pos === floor ? 'opacity-100' : ' opacity-0 '
      } ${sideStyle}   overflow-hidden bottom-2 transition-all duration-200 ease-in-out w-1/3 h-24 border-stone-800 border-2 rounded-md bg-sky-500/50 absolute z-50 `}
    >
      <img width={100} height={100} src={fireman} alt="fireman" />
    </div>
  )
}

const LevelSign = ({
  levelText,
  levelNumber,
  message,
  exactFloor,
  heightBuilding,
}: {
  levelText: 'trainee' | 'junior' | 'semi senior' | 'senior'
  levelNumber: number
  message: string
  exactFloor: number
  heightBuilding: number
}) => {
  return (
    <div
      className={`${
        (levelNumber === exactFloor && heightBuilding / 175 > levelNumber) ||
        (exactFloor === 1 && levelText === 'trainee')
          ? ' translate-x-[100%] rotate-0 animate-pulse -right-10 scale-100 opacity-100 '
          : ' -rotate-90 scale-0  '
      } opacity-0 transition-all  duration-300 ease-in-out absolute bottom-20 -z-10 w-[240px] h-40 flex flex-col items-center justify-center`}
    >
      <p className=" w-full p-6 py-8 font-medium text-center text-xl z-0  shadow-md shadow-black bg-gradient-to-r from-lime-300 to-lime-500 rounded-3xl">
        {message}
        <span className="font-bold uppercase">{levelText}</span>
      </p>
      <span className=" w-20 h-6 bg-black absolute left-0 -translate-x-[90%] -z-40 "></span>
    </div>
  )
}
