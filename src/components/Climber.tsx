/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import './Climber.css'

import backgroundCity from '../assets/city-skyline.png'
import climber1 from '../assets/climber01.webp'
import climber2 from '../assets/climber02.webp'
import Building from './Building'
import ConfettiStyled from './ConfettiStyled'
import StatusBar from './StatusBar'

const verticalStep = 10
const horizontalStep = 4
const minVerticalPosition = 4
const maxVerticalPosition = 50
const buildindStep = 50
const maxBuildingTop = 5350

const Climber = () => {
  const [topPosition, setTopPosition] = useState(minVerticalPosition)
  const [leftPosition, setLeftPosition] = useState(50)
  const [showClimber1, setShowClimber1] = useState(true)
  const [showClimber2, setShowClimber2] = useState(false)
  const [buildingPosition, setBuildingPosition] = useState(0)
  const [win, setWin] = useState(false)
  const [health, setHealth] = useState(3)

  const climberMove = (move: string) => {
    setShowClimber1((prev) => !prev)
    setShowClimber2((prev) => !prev)
    switch (move) {
      case 'ArrowUp':
        setTopPosition((prev) =>
          prev < maxVerticalPosition ? prev + verticalStep : prev
        )
        setBuildingPosition((prev) =>
          prev < maxBuildingTop ? prev + buildindStep : prev
        )
        break
      case 'ArrowDown':
        setTopPosition((prev) =>
          prev > minVerticalPosition ? prev - verticalStep : prev
        )
        setBuildingPosition((prev) =>
          prev >= buildindStep ? prev - buildindStep : prev
        )
        break
      case 'ArrowLeft':
        setLeftPosition((prev) => (prev > 5 ? prev - horizontalStep : prev))
        break
      case 'ArrowRight':
        setLeftPosition((prev) => (prev < 100 ? prev + horizontalStep : prev))
        break
      default:
        break
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setTimeout(() => {
        climberMove(event.key)
      }, 100)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (leftPosition < 30) {
      setTopPosition(minVerticalPosition)
      setBuildingPosition(minVerticalPosition)
      setLeftPosition(35)
      setHealth((prev) => prev - 1)
      setWin(false)
    }
    if (leftPosition >= 65) {
      setTopPosition(minVerticalPosition)
      setBuildingPosition(minVerticalPosition)
      setLeftPosition(60)
      setHealth((prev) => prev - 1)
      setWin(false)
    }
  }, [leftPosition])

  useEffect(() => {
    if (buildingPosition >= maxBuildingTop) {
      setWin(true)
    }
  }, [buildingPosition])

  return (
    <div className=" z-20 relative w-full h-full bg-gradient-to-tl from-sky-500 to-orange-400 ">
      <StatusBar health={health} position={buildingPosition} />
      <div className=" -z-10 absolute top-0 w-full h-full bg-gradient-to-t from-gray-600/80 to-gray-400/0 object-bottom">
        <img
          className=" w-full object-cover absolute "
          src={backgroundCity}
          alt=""
          style={{ bottom: `${2 - (buildingPosition / 1400) * 20}rem` }}
        />
      </div>
      <div className=" background absolute top-0 left-0  w-screen h-full flex justify-center">
        <div
          className="sky  w-full"
          style={{ height: `${20 + (buildingPosition / 1400) * 60}%` }}
        ></div>
        <Building buildingPosition={buildingPosition} />
      </div>

      <ClimberMan
        topPosition={topPosition}
        leftPosition={leftPosition}
        climberman1={showClimber1}
        climberman2={showClimber2}
      />
      {win && <ConfettiStyled />}
    </div>
  )
}

export default Climber

const ClimberMan = ({
  topPosition,
  leftPosition,
  climberman1,
  climberman2,
}: {
  topPosition: number
  leftPosition: number
  climberman1: boolean
  climberman2: boolean
}) => {
  return (
    <div className="">
      <img
        className={`${
          climberman1 ? ' opacity-100' : ' opacity-0'
        } z-10 transition-all duration-100 ease-in-out w-[100px] h-[200px] absolute`}
        src={climber1}
        alt="Climber"
        style={{
          bottom: `${
            topPosition <= maxVerticalPosition
              ? topPosition
              : maxVerticalPosition
          }%`,
          left: `${leftPosition}%`,
        }}
      />{' '}
      <img
        className={`${
          climberman2 ? 'opacity-100' : 'opacity-0'
        } z-10 transition-all duration-100 ease-in-out w-[100px] h-[200px] absolute`}
        src={climber2}
        alt="Climber"
        style={{
          bottom: `${
            topPosition <= maxVerticalPosition
              ? topPosition
              : maxVerticalPosition
          }%`,
          left: `${leftPosition}%`,
        }}
      />
    </div>
  )
}
