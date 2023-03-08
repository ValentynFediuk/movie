'use client'

import { PaginatedSlider } from "components"
import { useEffect, useState } from "react";
import { ISlide } from "components/Slider/Slider.props";
import styles from './FeaturedMovies.module.scss';

export const FeaturedMovies = () => {
	const [slides, setSlides] = useState<ISlide[]>([])
	const [paginatedSlides, setPaginatedSlides] = useState()
	const [perPage, setPerPage] = useState<number>(3)

	useEffect(() => {
		const newPaginatedSlides = [];
		for (let i = 0; i < perPage; i++) {
			newPaginatedSlides.push(slides[i]);
		}
		setPaginatedSlides(newPaginatedSlides);

	}, [slides, perPage]);
	const getSlideDetails = async (movieId: number) => {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
			return await res.json()
		} catch (e) {
			console.log(e)
		}
	}

	const getSlides = async () => {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
			);
			const data = await res.json();
			const detailedSlidePromises = data.results.map(async (slide) => {
				const detailedSlide = await getSlideDetails(slide.id);
				return detailedSlide;
			});
			const detailedSlides = await Promise.all(detailedSlidePromises);
			setSlides([...slides, ...detailedSlides]);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		(async () => {
			await getSlides()
		})()
	}, [])

	return (
		<div className={styles.wrapper}>
				<PaginatedSlider
					slides={slides}
					paginatedSlides={paginatedSlides}
					perPage={perPage}
					setPerPage={setPerPage}
					getSlides={getSlides}
				/>
		</div>
	)
}