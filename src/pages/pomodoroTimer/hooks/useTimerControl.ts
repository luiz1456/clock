import { useRef, useState } from "react"
import { useCreateTimerConfig } from './useCreateTimerConfig';

export interface ItimerConfig {
  numberOfFocusPeriods: number,
  longPauseInSeconds: number,
  shortBreakInSeconds: number,
  focusPeriodsInSeconds: number
}

interface ItimerState {
  fullFocusPeriods: number,
  currentTime: number,
  isFocusPeriod: boolean
}

interface Iprops {
  stopAudio: () => void
}

export function useTimerControl({ stopAudio }: Iprops) {
  if (!localStorage.getItem("timerConfig")) {
    useCreateTimerConfig({})
  }
  const timerConfig: ItimerConfig = JSON.parse(localStorage.getItem('timerConfig') as string)
  const timerState: ItimerState = JSON.parse(localStorage.getItem('timerState') as string)
  const [isPaused, setIsPaused] = useState(true)
  const timerRef = useRef<number>()
  const [time, setTime] = useState<number>(timerState.currentTime)
  const [isFocusPeriod, setIsFocusPeriod] = useState(timerState.isFocusPeriod)

  const start = () => {
    setIsPaused(false)
    timerRef.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
  }


  const stop = () => {
    clearInterval(timerRef.current)
    setIsPaused(true)
  }

  const restartTimer = () => {
    stopAudio()
    stop()
    if (isFocusPeriod) {
      setTime(timerConfig.focusPeriodsInSeconds)
      return
    }
    if (timerState.fullFocusPeriods === timerConfig.numberOfFocusPeriods) {
      setTime(time || timerConfig.longPauseInSeconds)
      return
    }
    setTime(timerConfig.shortBreakInSeconds)
  }

  return {
    timerConfig,
    timerState,
    time,
    setTime,
    isFocusPeriod,
    isPaused,
    setIsFocusPeriod,
    start,
    stop,
    restartTimer,
    setIsPaused,
    timerRef
  }
}