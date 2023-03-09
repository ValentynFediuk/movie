'use client'

import { PaginatedSlider, Spinner } from 'components'
import { useEffect, useState } from 'react'
import { Slides } from 'components/Slider/Slider.props'
import { useSlides } from 'http/hooks'
import { usePaginateSlides } from 'hooks'
import styles from './FeaturedMovies.module.scss'

export const FeaturedMovies = () => {
  const [slides, setSlides] = useState<Slides[]>([])
  const [paginatedSlides, setPaginatedSlides] = useState<Slides[]>([])
  const [perPage, setPerPage] = useState<number>(3)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newPaginatedSlides = usePaginateSlides(perPage, slides)
    setPaginatedSlides(newPaginatedSlides)
  }, [slides, perPage])

  useEffect(() => {
    (async () => {
      try {
        const detailedSlides: Slides[] = (await useSlides(
          'movie',
          'popular'
        )) as Slides[]
        setSlides(detailedSlides)
        setLoading(false)
      } catch (e) {
        console.log(e)
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
