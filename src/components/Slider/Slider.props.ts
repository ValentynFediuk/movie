import { ISlide } from 'types'

export interface SliderProps {
  slideType: 'featured' | 'releases'
  slides: Slides[]
  spacing?: number
}

export interface Slides extends ISlide {
  overview: string
  poster_path: string
  original_name: string
  backdrop_path: string

}
