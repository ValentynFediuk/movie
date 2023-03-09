export const usePaginateSlides = (perPage: number, slides: any[]) => {
  const newPaginatedSlides = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < perPage; i++) {
    newPaginatedSlides.push(slides[i])
  }

  return newPaginatedSlides
}
