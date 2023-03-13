'use client'

import { SetStateAction, useEffect, useState } from 'react'
import { IGenre, ISlide } from 'types'
import { getSlides } from 'api'
import { Title } from 'components/ui/Title/Title'
import { Button } from 'components/ui/Button/Button'
import { Spinner } from 'components/ui/Spinner/Spinner'
import { getGenres } from 'api/getGenres'
import { ReactSelect } from 'components/ui/ReactSelect/ReactSelect'
import styles from './Page.module.scss'
import { NewReleaseCard } from '../components/NewReleaseCard/NewReleaseCard'

export const NewReleasesPage = () => {
  const [slides, setSlides] = useState<ISlide[]>([])
  const [filteredSlides, setFilteredSlides] = useState<ISlide[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [queryPage, setQueryPage] = useState<number>(1)
  const [options, setOptions] = useState<IGenre[]>([
    { id: 0, name: 'All', value: 'All', label: 'All' },
  ])
  const [selectedGenre, setSelectedGenre] = useState<string>('All')

  useEffect(() => {
    ;(async () => {
      try {
        const genres = await getGenres('movie')
        setOptions([...options, ...genres])
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const detailedSlides: ISlide[] = (await getSlides(
          'movie',
          'upcoming',
          queryPage
        )) as ISlide[]
        setSlides([...slides, ...detailedSlides])
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [queryPage])

  const handleShowMore = () => {
    setQueryPage((prevState) => prevState + 1)
  }

  const handleSelect = (event: { value: SetStateAction<string> }) => {
    setSelectedGenre(event.value)
  }

  useEffect(() => {
    const filterSlides = () => {
      if (selectedGenre === 'All') {
        setFilteredSlides(slides)
      } else {
        const filteringSlides = slides.filter((slide) =>
          slide.genres.some((g) => g.name === selectedGenre)
        )
        setFilteredSlides(filteringSlides)
      }
    }

    filterSlides()
  }, [selectedGenre, slides])

  return (
    <div className={styles.wrapper}>
      <nav>
        <a href='/'>
          <svg>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </a>
        <Title className={styles.title} typeTitle='h1' size='l'>
          New releases
        </Title>
        <ReactSelect
          className={styles.select}
          options={options}
          onChange={(event: any) => handleSelect(event)}
        />
      </nav>
      <div className={styles.grid}>
        {filteredSlides.map((slide) => (
          <NewReleaseCard key={slide.id} {...slide} />
        ))}
      </div>
      <div className={styles.button}>
        {loading ? (
          <Spinner />
        ) : (
          <Button
            handleClick={handleShowMore}
            typeBtn='button'
            appearance='white'
          >
            Show more
          </Button>
        )}
      </div>
    </div>
  )
}
