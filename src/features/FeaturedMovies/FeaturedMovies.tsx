import { Slider } from "components"
import clsx from "clsx";
import { FeaturedMovie } from './components/FeaturedMovie/FeaturedMovie';
import styles from './FeaturedMovies.module.scss';
import { FeaturedMovieProps } from './components/FeaturedMovie/FeaturedMovie.props';

async function getData() {
	const res = await fetch(`${process.env.BASE_URL}movie/popular?api_key=${process.env.API_KEY}`);
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export const FeaturedMovies = async () => {
	const data = await getData()

	return (
		<div className={styles.wrapper}>
			<Slider slides={data.results} slidesPerView={1} dots>
				{data.results.map((slide: JSX.IntrinsicAttributes & FeaturedMovieProps, index) => (
					<FeaturedMovie key={slide.id} {...slide} className={clsx('keen-slider__slide')} />
				))}
			</Slider>
		</div>
	)
}