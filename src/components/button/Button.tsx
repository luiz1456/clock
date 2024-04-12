import { ButtonStyles } from './style.ts'

interface Iprops {
  children: any
  onClick?: () => void
  flex?: boolean
  type?: string
}

export default function Button({children, onClick, flex}: Iprops) {
  return (
    <ButtonStyles onClick={onClick} $flex={flex}>{children}</ButtonStyles>
  )
}
