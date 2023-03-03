'use client'

import { FC, useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from "clsx";
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';
import { useWindowSize } from "../../hooks";

export const Slider: FC<SliderProps> = ({
	slides,
	slidesPerView,
	dots = false,
	spacing = 0,
	children
}) => {
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

	return (

		<div className={styles.navigation_wrapper}>
			{children &&
          <div ref={sliderRef} className={clsx(styles.slider, 'keen-slider')}>
						{children}
          </div>
			}
			{loaded && instanceRef.current && (
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
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
						className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_right, currentSlide === instanceRef.current.track.details.maxIdx && styles.arrow__disabled)}
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