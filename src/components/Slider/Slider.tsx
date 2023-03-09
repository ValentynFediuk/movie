
import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from "clsx";
import { useWindowSize } from "hooks";
import { NewReleaseCard } from "features/NewReleases/components/NewReleaseCard/NewReleaseCard";
import { FeaturedTVShowCard } from "features/FeaturedTVShows/components/FeaturedTVShowCard/FeaturedTVShowCard";
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';

export const Slider: FC<SliderProps> = ({
	slides,
	paginatedSlides,
	slidesPerView,
	spacing = 0,
	perPage,
	slideType,
	loading,
}) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [initialPerPage] = useState(perPage)
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
		// @ts-ignore
		if (perPage > initialPerPage) {
				instanceRef?.current?.update();
				instanceRef.current?.next()
		}
	}, [slides])
	if (slides && slides[0] === undefined) return null
	if (paginatedSlides && paginatedSlides[0] === undefined) return null

	return (
		<div className={styles.navigation_wrapper}>
			<div
				ref={sliderRef}
				className={clsx(styles.slider, 'keen-slider')}
			>
				{slideType === 'featured' && slides?.map((slide, index) => (
					// @ts-ignore
					// eslint-disable-next-line react/no-array-index-key
					<FeaturedTVShowCard key={index} {...slide} className={clsx('keen-slider__slide')} />
				))}

				{slideType === 'releases' && slides?.map((slide, index) => (
					// @ts-ignore
					// eslint-disable-next-line react/no-array-index-key
						<NewReleaseCard key={index} {...slide} className={clsx('keen-slider__slide')} />
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
					{loading ? <div>Loading...</div> :
						<button
								type='button'
							// @ts-ignore
								onClick={(event) => event.stopPropagation() || instanceRef.current?.next()}
								className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_right, currentSlide === instanceRef.current.track.details.maxIdx && styles.arrow__disabled)}
						>
								<svg
										viewBox='0 0 8 12'
								>
										<use href='/icons/sprite.svg#arrow' />
								</svg>
						</button>
					}
				</>
			)}
		</div>
	)
}