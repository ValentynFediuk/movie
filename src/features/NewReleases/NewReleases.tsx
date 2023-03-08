'use client'

import { FC, useEffect, useState } from 'react'
import { Button } from "components/Button/Button";
import Link from 'next/link';
import { Slider } from "components/Slider/Slider";
import { ISlide } from "components/Slider/Slider.props";
import styles from './NewReleases.module.scss';
import { NewReleasesProps } from './NewReleases.props'

export const NewReleases: FC<NewReleasesProps> = () => {
  const [slides, setSlides] = useState<ISlide[]>([])
  const [paginatedSlides, setPaginatedSlides] = useState()
  const [perPage, setPerPage] = useState<number>(7)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const newPaginatedSlides = [];
    for (let i = 0; i < perPage; i++) {
      newPaginatedSlides.push(slides[i]);
    }
    setPaginatedSlides(newPaginatedSlides);

  }, [slides, perPage]);
  const getSlideDetails = async (movieId: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
      return await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  const getSlides = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      const detailedSlidePromises = data.results.map(async (slide) => {
        const detailedSlide = await getSlideDetails(slide.id);
        return detailedSlide;
      });
      const detailedSlides = await Promise.all(detailedSlidePromises);
      setSlides([...slides, ...detailedSlides]);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };

  useEffect(() => {
    getSlides()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Button appearance='transparent' typeBtn='button'>
        <Link href='/new-release'>
          <span>New releases</span>
          <svg viewBox='0 0 8 12'>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </Link>
      </Button>
      <div className={styles.releases}>
          <Slider
            slides={slides}
            paginatedSlides={paginatedSlides}
            slidesPerView='auto'
            perPage={perPage}
            setPerPage={setPerPage}
            getSlides={getSlides}
            slideType='releases'
            loading={loading}
            setLoading={setLoading}
            spacing={16}
          />
      </div>
    </div>
  )
}
