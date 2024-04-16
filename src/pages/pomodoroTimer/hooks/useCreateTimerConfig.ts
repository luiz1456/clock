interface Iprops {
  focusPeriodSize?: string
  shortBreak?: string
  longPause?: string
  focusPeriods?: string
}

export function useCreateTimerConfig({ focusPeriodSize, shortBreak, longPause, focusPeriods }: Iprops) {


  const focusPeriodsInSeconds = (Number(focusPeriodSize) * 60) || 25 * 60
  const shortBreakInSeconds = (Number(shortBreak) * 60) || 5 * 60
  const longPauseInSeconds = (Number(longPause) * 60) || 15 * 60
  const numberOfFocusPeriods = Number(focusPeriods) || 4
  const timerConfig = { focusPeriodsInSeconds, shortBreakInSeconds, longPauseInSeconds, numberOfFocusPeriods }
  const timerState = JSON.stringify({ currentTime: timerConfig.focusPeriodsInSeconds, currentInterval: 0, isFocusPeriod: true })
  localStorage.setItem('timerConfig', JSON.stringify(timerConfig))
  localStorage.setItem('timerState', timerState)

  return {
    timerConfig
  }
}
