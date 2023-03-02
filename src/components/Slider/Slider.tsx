'use client'

import { FC, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import clsx from "clsx";
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';

export const Slider: FC<SliderProps> = ({
	slides,
	slidesPerView,
	dots = false,
	children
}) => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		mode: "snap",
		slides: {
			perView: slidesPerView,
			spacing: 15,
		},
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		},
		created() {
			setLoaded(true)
		},
	})

	return (
		<div className={styles.navigation_wrapper}>
			<div ref={sliderRef} className={clsx(styles.slider, 'keen-slider')}>
				{children}
			</div>
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
						className={clsx(styles.arrow_wrapper, styles.arrow_wrapper_right, currentSlide === instanceRef.current.track.details.slides.length - 1 && styles.arrow__disabled)}
						// aria-label={`Go to slide ${currentSlide + 1}`}
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