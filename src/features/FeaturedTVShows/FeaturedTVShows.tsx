'use client'

import { useEffect, useState } from 'react'
import { Button } from 'components/ui/Button/Button'
import Link from 'next/link'
import { Slider } from 'components/Slider/Slider'
import { ISlide } from 'types'
import { getSlides } from '../../api'
import styles from './FeaturedTVShows.module.scss'

export const FeaturedTVShows = () => {
  const [slides, setSlides] = useState<ISlide[]>([])

  useEffect(() => {
    (async () => {
      try {
        const detailedSlides: ISlide[] = (await getSlides(
          'tv',
          'popular'
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
        <Link href='/tv-show'>
          <span>Featured TV shows</span>
          <svg viewBox='0 0 8 12'>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </Link>
      </Button>
      <div className={styles.releases}>
        <Slider slides={slides} slideType='featured' />
      </div>
    </div>
  )
}
