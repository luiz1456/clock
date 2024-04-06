import { useEffect, useRef } from "react"

interface Iprops {
  sound: any
  repeat: boolean
}

export default function usePlaySounds({ sound, repeat }: Iprops) {
  const soundRef = useRef< HTMLAudioElement >()
  
  useEffect(() => {
    soundRef.current = new Audio(sound)
  }, [])

  if (repeat && soundRef.current) {
    soundRef.current.loop = true
  }

  const play = () => {
    soundRef.current?.play()
  }

  const stop = () => {
    soundRef.current?.pause()
  }

  return {
    play,
    stop,
  }
}
