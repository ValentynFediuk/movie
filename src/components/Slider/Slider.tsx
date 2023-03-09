import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from 'clsx'
import { useWindowSize } from 'hooks'
import { NewReleaseCard } from 'features/NewReleases/components/NewReleaseCard/NewReleaseCard'
import { FeaturedTVShowCard } from 'features/FeaturedTVShows/components/FeaturedTVShowCard/FeaturedTVShowCard'
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss'

export const Slider: FC<SliderProps> = ({
  slides,
  spacing = 0,
  slideType
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  let windowSize

  if (typeof window !== 'undefined') {
    windowSize = useWindowSize()
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 'auto',
      spacing,
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

  if (slides && slides[0] === undefined) return null

  return (
    <div className={styles.navigation_wrapper}>
      <div ref={sliderRef} className={clsx(styles.slider, 'keen-slider')}>
        {slideType === 'featured' &&
          slides?.map((slide) => (
            <FeaturedTVShowCard
              key={slide.id}
              {...slide}
              className={clsx('keen-slider__slide')}
            />
          ))}

        {slideType === 'releases' &&
          slides?.map((slide) => (
            <NewReleaseCard
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
            onClick={() => instanceRef.current?.next()}
            className={clsx(
              styles.arrow_wrapper,
              styles.arrow_wrapper_right,
              currentSlide === instanceRef.current.track.details.maxIdx &&
                styles.arrow__disabled
            )}
            aria-label='Go to previous slide'
          >
            <svg viewBox='0 0 8 12'>
              <use href='/icons/sprite.svg#arrow' />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
