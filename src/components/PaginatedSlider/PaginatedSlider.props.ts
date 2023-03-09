import { Dispatch, SetStateAction } from 'react'
import { ISlide } from 'types'

export interface PaginatedSliderProps {
  slides: Slide[]
  paginatedSlides: Slide[]
  perPage: number
  setPerPage?: Dispatch<SetStateAction<number>>
}

export interface Slide extends ISlide {
  overview: string
  backdrop_path: string

}
