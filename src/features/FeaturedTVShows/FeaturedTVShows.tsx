'use client'

import { useEffect, useState } from 'react'
import { Button } from 'components/Button/Button'
import Link from 'next/link'
import { Slider } from 'components/Slider/Slider'
import { useSlides } from 'http/hooks'
import { Slides } from 'components/Slider/Slider.props'
import styles from './FeaturedTVShows.module.scss'

export const FeaturedTVShows = () => {
  const [slides, setSlides] = useState<Slides[]>([])

  useEffect(() => {
    (async () => {
      try {
        const detailedSlides: Slides[] = (await useSlides(
          'tv',
          'popular'
        )) as Slides[]
        setSlides(detailedSlides)
      } catch (e) {
        console.log(e)
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
