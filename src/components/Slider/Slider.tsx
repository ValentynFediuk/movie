'use client'

import React, {Children, cloneElement, FC} from 'react'
import { SliderProps } from './Slider.props'
import styles from './Slider.module.scss';

import { useState } from "react";
import clsx from "clsx";
import {FeaturedMovie} from "components";

export const Slider:FC<SliderProps> = ( {slides, children} ) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleSlideChange = (event) => {
		setCurrentSlide(parseInt(event.target.value));
	};

	return (
		<div className={styles.slider}>
			{slides.map((_slide, index) => (
				<input
					key={index}
					type="radio"
					name="slider"
					id={`slide-${index}`}
					value={index}
					checked={currentSlide === index}
					onChange={handleSlideChange}
				/>
			))}
			<div className={styles.slides}>
				{slides.map((slide, index) => (
					<div key={index} className={clsx(styles.slide, currentSlide === index && styles.active)}>
						<FeaturedMovie {...slide} />
					</div>
				))}
			</div>
			<div className={styles.indicators}>
				{slides.map((_slide, index) => (
					<label key={index} htmlFor={`slide-${index}`}></label>
				))}
			</div>
		</div>
	);
}