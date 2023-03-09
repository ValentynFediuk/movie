import { $api } from 'http/axios'

const getSlideDetails = async (movieId: number, movieType: string) => {
  try {
    const { data } = await $api.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}${movieType}/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    return data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const useSlides = async (movieType: string, movieStatus: string) => {
  try {
    const { data } = await $api.get(
      `${movieType}/${movieStatus}/?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
    const detailedSlidePromises = data.results.map((slide: { id: number }) =>
      getSlideDetails(slide.id, movieType)
    )
    const detailedSlides = await Promise.allSettled(detailedSlidePromises)
    const fulfilledSlides = detailedSlides.filter(
      (slide) => slide.status === 'fulfilled'
    )

    return fulfilledSlides.map((slide: any) => slide.value)
  } catch (e) {
    console.log(e)
    throw e
  }
}