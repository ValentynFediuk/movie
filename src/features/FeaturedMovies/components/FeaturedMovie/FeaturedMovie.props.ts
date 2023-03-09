import { IGenres } from "types/ISlide";

export interface FeaturedMovieProps {
  id: number
  vote_average: number
  overview?: string
  backdrop_path: string
  original_title: string
  className: string
  genres: IGenres[]
  homepage: string
}
