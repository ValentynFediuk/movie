import { FC } from 'react'
import { Slider } from "components"
import clsx from "clsx";
import { FeaturedMoviesProps } from './FeaturedMovies.props'
import { FeaturedMovie } from './components/FeaturedMovie/FeaturedMovie';
import styles from './FeaturedMovies.module.scss';
import { featuredMoviesData } from './featured-movies.data';

export const FeaturedMovies: FC<FeaturedMoviesProps> = () => (
	<div className={styles.wrapper}>
		<Slider slides={featuredMoviesData} slidesPerView={1} dots>
			{featuredMoviesData.map(slide => (
				<FeaturedMovie key={slide.id} {...slide} className={clsx('keen-slider__slide')} />
			))}
		</Slider>
	</div>
);