import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

export default function ConfettiStyled() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  function handleWindow() {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindow)
    return () => {
      window.removeEventListener('resize', handleWindow)
    }
  }, [])

  return <Confetti width={windowWidth} height={windowHeight} />
}
