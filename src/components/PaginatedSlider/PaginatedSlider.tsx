import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from "clsx";
import { useWindowSize } from "hooks";
import { FeaturedMovie } from "features/FeaturedMovies/components/FeaturedMovie/FeaturedMovie";
import { PaginatedSliderProps } from './PaginatedSlider.props'
import styles from './PaginatedSlider.module.scss';

export const PaginatedSlider: FC<PaginatedSliderProps> = ({
	slides,
	paginatedSlides,
	perPage,
	setPerPage,
}) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [initialPerPage, setInitialPerPage] = useState(perPage)
	let windowSize
	if (typeof window !== "undefined") {
		windowSize = useWindowSize()
	}

	const [sliderRef, instanceRef] =  useKeenSlider<HTMLDivElement>({
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
			instanceRef?.current?.update();
		}, 1000)

		return () => clearTimeout(updateSliderTimeout)
	}, [windowSize?.width, loaded]);

	useEffect(() => {
		if (perPage > initialPerPage) {
				instanceRef?.current?.update();
				instanceRef.current?.next()
		}
	}, [paginatedSlides])

	const handleClickRightArrow = async (event: any) => {
		if (currentSlide === instanceRef?.current?.track.details.maxIdx && currentSlide < 20) {
			setPerPage((prev) => prev + 1)
		}
		event.stopPropagation() || instanceRef.current?.next()
	}

	if (slides && slides[0] === undefined) return null
	if (paginatedSlides && paginatedSlides[0] === undefined) return null

	return (
		<div className={styles.navigation_wrapper}>
			<div
				ref={sliderRef}
				className={clsx(styles.slider, 'keen-slider')}
			>
				{paginatedSlides?.map((slide, index) => (
					<FeaturedMovie key={index} {...slide} className={clsx('keen-slider__slide')} />
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
							className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_right, currentSlide === slides.length - 1 && styles.arrow__disabled)}
					>
							<svg
									viewBox='0 0 8 12'
							>
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
							key={index}
							onClick={() => {
								instanceRef.current?.moveToIdx(index)
							}}
							className={clsx(styles.dot, currentSlide === index && styles.active)}
							aria-label={`Go to slide ${index}`}
						/>
					))}
				</div>
			)}
		</div>
	)
}