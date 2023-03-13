import { IGenre } from './IGenre'

export interface ISlide {
  id: number
  genres: IGenre[]
  vote_average: number
  original_title: string
  homepage: string
  overview: string
  poster_path: string
  original_name: string
  backdrop_path: string
}