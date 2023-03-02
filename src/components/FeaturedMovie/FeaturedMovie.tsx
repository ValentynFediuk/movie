import { FC } from 'react'
import { Button, Genre, Rating, Title } from "components"
import clsx from "clsx";
import Image from 'next/image';
import Link from 'next/link';
import { FeaturedMovieProps } from './FeaturedMovie.props'
import styles from './FeaturedMovie.module.scss'

export const FeaturedMovie: FC<FeaturedMovieProps> = ({
	image,
	genre,
	rating,
	title,
	description,
	className
}) => (
	<div className={clsx(styles.movie, className)}>
		<Image
			fill
			className={styles.movie_image}
			src={image}
			alt='Picture of the author'
		/>
		<div className='container'>
			<div className={styles.movie_info}>
				<Genre appearance='teal'>{genre}</Genre>
				<Rating color='white' count={rating}/>
				<Title typeTitle='h1' size='l'>{title}</Title>
				<p>{description}</p>
				<Button appearance='gradient' typeBtn='button'>
					<Link href='/test-route'>Watch now</Link>
				</Button>
			</div>
		</div>
	</div>
);