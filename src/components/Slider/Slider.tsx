'use client'

import { FC } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { SliderProps } from './Slider.props'

export const Slider:FC<SliderProps> = ( {slides, children} ) => {
	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			slideChanged() {
				console.log('slide changed')
			},
		},
		[
			// add plugins here
		]
	)
	return (

		<div ref={sliderRef} className='keen-slider'>
				{children}
		</div>
	)
}