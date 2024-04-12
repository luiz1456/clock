import { useEffect, useRef } from "react"

interface Iprops {
  sound: string
  repeat?: boolean
}

export default function usePlaySounds({ sound, repeat }: Iprops) {
  const soundRef = useRef< HTMLAudioElement >()
  
  useEffect(() => {
    soundRef.current = new Audio(sound)
  }, [])

  if (repeat && soundRef.current) {
    soundRef.current.loop = true
  }

  const playAudio = () => {
    soundRef.current?.play()
  }

  const stopAudio = () => {
    soundRef.current?.pause()
  }

  return {
    playAudio,
    stopAudio,
  }
}
