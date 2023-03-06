
import { FC } from 'react'
import { Button, Genre, Rating, Title } from "components"
import clsx from "clsx";
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedMovieProps } from './FeaturedMovie.props'
import styles from './FeaturedMovie.module.scss'

async function getData(movieID) {
	const res = await fetch(`${process.env.BASE_URL}movie/${movieID}?api_key=${process.env.API_KEY}&total_results=1`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}
export const FeaturedMovie: FC<FeaturedMovieProps> = async ({
	id,
	backdrop_path,
	vote_average,
	original_title,
	className,
	overview,
}) => {
	const data = await getData(id);

	return (
		<div className={clsx(styles.movie, className)}>
			<Image
				fill
				className={styles.movie_image}
				src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
				alt='Picture of the author'
			/>
			<div className={styles.movie_info}>
				<Genre appearance='teal'>
					{
						data.genres.map((genre, index) => (
							index !== data.genres.length - 1 ? `${genre.name}, ` : genre.name
						))
					}
				</Genre>
				<Rating color='white' count={Number(vote_average.toFixed(0))}/>
				<Title typeTitle='h1' size='l'>{original_title}</Title>
				<p>{overview}</p>
				<Button appearance='gradient' typeBtn='button'>
						<Link href={data.homepage}>{data.homepage.length ? 'Watch now' : 'Not available'}</Link>
				</Button>
			</div>
		</div>
	)
}