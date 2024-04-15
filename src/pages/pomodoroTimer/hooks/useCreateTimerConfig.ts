interface Iprops {
  focusPeriodSize?: string
  shortBreak?: string
  longPause?: string
  focusPeriods?: string
}

export default function useCreateTimerConfig({ focusPeriodSize, shortBreak, longPause, focusPeriods }: Iprops) {

  const focusPeriodsInSeconds = Number(focusPeriodSize) || 25 * 60
  const shortBreakInSeconds = Number(shortBreak) || 5 * 60
  const longPauseInSeconds = Number(longPause) || 15 * 60
  const numberOfFocusPeriods = Number(focusPeriods) || 4
  const timerConfig = { focusPeriodsInSeconds, shortBreakInSeconds, longPauseInSeconds, numberOfFocusPeriods }
  const timerState = JSON.stringify({ currentTime: timerConfig.focusPeriodsInSeconds, currentInterval: 0, isFocusPeriod: true })
  localStorage.setItem('timerConfig', JSON.stringify(timerConfig))
  localStorage.setItem('timerState', timerState)

  return {
    timerConfig
  }
}