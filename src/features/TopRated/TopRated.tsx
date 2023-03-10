'use client'

import { useEffect, useState } from 'react'
import { Button } from 'components/ui/Button/Button'
import Link from 'next/link'
import { Slider } from 'components/Slider/Slider'
import { ISlide } from 'types'
import { getSlides } from 'api/hooks'
import styles from './TopRated.module.scss'

export const TopRated = () => {
  const [slides, setSlides] = useState<ISlide[]>([])

  useEffect(() => {
    (async () => {
      try {
        const detailedSlides: ISlide[] = (await getSlides(
          'movie',
          'top_rated',
          1
        )) as ISlide[]
        setSlides(detailedSlides)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Button appearance='transparent' typeBtn='button'>
        <Link href='/top-rated'>
          <span>Top rated</span>
          <svg viewBox='0 0 8 12'>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </Link>
      </Button>
      <div className={styles.releases}>
        <Slider slides={slides} slideType='releases' spacing={16} />
      </div>
    </div>
  )
}
