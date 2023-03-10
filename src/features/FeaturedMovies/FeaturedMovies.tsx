'use client'

import { PaginatedSlider, Spinner } from 'components'
import { useEffect, useState } from 'react'
import { getSlides } from 'api'
import { usePaginateSlides } from 'hooks'
import { ISlide } from 'types'
import styles from './FeaturedMovies.module.scss'

export const FeaturedMovies = () => {
  const [slides, setSlides] = useState<ISlide[]>([])
  const [paginatedSlides, setPaginatedSlides] = useState<ISlide[]>([])
  const [perPage, setPerPage] = useState<number>(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newPaginatedSlides = usePaginateSlides(perPage, slides)
    setPaginatedSlides(newPaginatedSlides)
  }, [slides, perPage])

  useEffect(() => {
    (async () => {
      try {
        const detailedSlides: ISlide[] = (await getSlides(
          'movie',
          'popular'
        )) as ISlide[]
        setSlides(detailedSlides)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className={styles.wrapper}>
      {loading
      ?
        <Spinner />
      :
        <PaginatedSlider
          slides={slides}
          paginatedSlides={paginatedSlides}
          perPage={perPage}
          setPerPage={setPerPage}
        />
      }
    </div>
  )
}
