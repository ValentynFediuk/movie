'use client'

import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from "clsx";
import { useWindowSize } from "hooks";
import { FeaturedMovie } from "features/FeaturedMovies/components/FeaturedMovie/FeaturedMovie";
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';

export const Slider: FC<SliderProps> = ({
	slides,
	slidesPerView,
	dots = false,
	spacing = 0,
	setPerPage
}) => {

	useEffect(() => {
		console.log(slides, 'slides')
	}, [])

	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	let windowSize
	if (typeof window !== "undefined") {
		windowSize = useWindowSize()
	}

	const [sliderRef, instanceRef] =  useKeenSlider<HTMLDivElement>({
		slides: {
			perView: slidesPerView,
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
			instanceRef?.current?.update();
		}, 1000)

		return () => clearTimeout(updateSliderTimeout)
	}, [windowSize?.width, loaded]);

	useEffect(() => {
		console.log(slides)
	}, [slides])

	const handleClickRightArrow = (event: any) => {
			setPerPage((prev) => prev + 1)
			instanceRef.current?.next()

	}

	if (slides[0] === undefined) return null

	return (
		<div className={styles.navigation_wrapper}>
			<div ref={sliderRef} className={clsx(styles.slider, 'keen-slider')}>
				{slides.map((slide) => (
					<FeaturedMovie key={slide.id} {...slide} className={clsx('keen-slider__slide')} />
				))}
			</div>
			{loaded && instanceRef.current && instanceRef.current.track.details && (
				<>
					<button
						type='button'
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
						className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_left, currentSlide === 0 && styles.arrow__disabled)}>
						<svg
							className={clsx(styles.arrow, styles.arrow__left)}
							viewBox='0 0 8 12'
						>
								<use href='/icons/sprite.svg#arrow' />
						</svg>
					</button>
					<button
						type='button'
						onClick={(event) => handleClickRightArrow(event)}
						className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_right)}
					>
						<svg
							viewBox='0 0 8 12'
						>
							<use href='/icons/sprite.svg#arrow' />
						</svg>
					</button>
				</>
			)}
			{dots && loaded && instanceRef.current && (
				<div className={styles.dots}>
					{slides.map(slide => (
						<button
							type='button'
							key={slide.id}
							onClick={() => {
								instanceRef.current?.moveToIdx(slide.id)
							}}
							className={clsx(styles.dot, currentSlide === slide.id && styles.active)}
							aria-label={`Go to slide ${slide.id}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}