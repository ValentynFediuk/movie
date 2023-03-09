import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  typeBtn: string
  loadingData?: boolean
  appearance: 'primary' | 'secondary' | 'white' | 'gradient' | 'transparent'
  handleClick?: () => void
}
