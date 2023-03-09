export interface ISlide {
  id: number
  genres: IGenres[]
  vote_average: number
  original_title: string
  homepage: string
}

export interface IGenres {
  id: number
  name: string
}
