import { ISlide } from 'types'

export interface SliderProps {
  slideType: 'featured' | 'releases'
  slides: ISlide[]
  spacing?: number
}