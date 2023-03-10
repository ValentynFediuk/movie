import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from 'clsx'
import { useWindowSize } from 'hooks'
import { FeaturedMovie } from 'features/FeaturedMovies/components/FeaturedMovie/FeaturedMovie'
import { PaginatedSliderProps } from './PaginatedSlider.props'
import styles from './PaginatedSlider.module.scss'

export const PaginatedSlider: FC<PaginatedSliderProps> = ({
  slides,
  paginatedSlides,
  perPage,
  setPerPage,
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [initialPerPage] = useState<number>(perPage)
  let windowSize
  if (typeof window !== 'undefined') {
    windowSize = useWindowSize()
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    const updateSliderTimeout = setTimeout(() => {
      instanceRef?.current?.update()
    }, 1000)

    return () => clearTimeout(updateSliderTimeout)
  }, [windowSize?.width, loaded])

  useEffect(() => {
    if (perPage > initialPerPage) {
      instanceRef?.current?.update()
      instanceRef.current?.next()
    }
  }, [paginatedSlides])

  const handleClickRightArrow = async () => {
    if (
      currentSlide === instanceRef?.current?.track.details.maxIdx &&
      currentSlide < 20
    ) {
      if (setPerPage) {
        setPerPage((prev) => prev + 1)
      }
    }
    instanceRef.current?.next()
  }

  if (
    (paginatedSlides && paginatedSlides[0] === undefined) ||
    (slides && slides[0] === undefined)
  )
    return null

  return (
    <div className={styles.navigation_wrapper}>
      <div ref={sliderRef} className={clsx(styles.slider, 'keen-slider')}>
        {paginatedSlides?.map((slide) => (
          <FeaturedMovie
            key={slide.id}
            {...slide}
            className={clsx('keen-slider__slide')}
          />
        ))}
      </div>
      {loaded && instanceRef.current && instanceRef.current.track.details && (
        <>
          <button
            type='button'
            onClick={() => instanceRef.current?.prev()}
            className={clsx(
              styles.arrow_wrapper,
              styles.arrow_wrapper_left,
              currentSlide === 0 && styles.arrow__disabled
            )}
            aria-label='Go to next slide'
          >
            <svg
              className={clsx(styles.arrow, styles.arrow__left)}
              viewBox='0 0 8 12'
            >
              <use href='/icons/sprite.svg#arrow' />
            </svg>
          </button>
          <button
            type='button'
            onClick={() => handleClickRightArrow()}
            className={clsx(
              styles.arrow_wrapper,
              styles.arrow_wrapper_right,
              currentSlide === slides.length - 1 && styles.arrow__disabled
            )}
            aria-label='Go to previous slide'
          >
            <svg viewBox='0 0 8 12'>
              <use href='/icons/sprite.svg#arrow' />
            </svg>
          </button>
        </>
      )}
      {loaded && instanceRef.current && (
        <div className={styles.dots}>
          {paginatedSlides?.map((slide, index) => (
            <button
              type='button'
              key={slide.id}
              onClick={() => {
                instanceRef.current?.moveToIdx(index)
              }}
              className={clsx(
                styles.dot,
                currentSlide === index && styles.active
              )}
              aria-label={`Go to slide ${index}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
