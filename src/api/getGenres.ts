import { $api } from 'http/axios'
import { IGenre } from 'types/IGenre'

export const getGenres = async (movieType: string) => {
  try {
    const { data } = await $api.get(`genre/${movieType}/list`, {
      params: { api_key: process.env.NEXT_PUBLIC_API_KEY },
    })

    return data.genres.map((genre: IGenre) => ({
      id: genre.id,
      label: genre.name,
      value: genre.name,
    }))
  } catch (error) {
    console.error(error)
    throw error
  }
}