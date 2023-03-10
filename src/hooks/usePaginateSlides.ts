import { ISlide } from "types/ISlide";

export const usePaginateSlides = (perPage: number, slides: ISlide[]) => {
  const newPaginatedSlides = []
  for (let i = 0; i < perPage; i++) {
    newPaginatedSlides.push(slides[i])
  }

  return newPaginatedSlides
}
