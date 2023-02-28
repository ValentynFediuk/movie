'use client'

import { FC, useState } from 'react'
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Gg from '../../../public/images/mock-hero-bg.jpeg'

export const Slider: FC<SliderProps> = ( {children} ) => {
	console.log(children)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		},
		created() {
			setLoaded(true)
		},
	})

	return (
		<div ref={sliderRef} className='keen-slider'>
			{/*<Gg />*/}
			{/*{[children].map((child, index) => (*/}
			{/*	<div key={index} className='keen-slider__slide'>{child}</div>*/}
			{/*))}*/}
		</div>
	)
};