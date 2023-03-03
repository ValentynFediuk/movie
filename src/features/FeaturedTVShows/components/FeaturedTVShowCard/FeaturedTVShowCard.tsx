import { FC } from 'react'
import { Genre, Rating, Title } from "components"
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { FeaturedTVShowCardProps } from './FeaturedTVShowCard.props'
import styles from './FeaturedTVShowCard.module.scss';

export const FeaturedTVShowCard: FC<FeaturedTVShowCardProps> = ({
	image,
	genre,
	rating,
	title,
	className
}) => (
    <Link href='/test-release-card' className={clsx(styles.card, className)}>
			<Image
				fill
				className={styles.image}
				src={image}
				alt='Picture of the author'
			/>
			<div className={styles.description}>
				<Genre appearance='teal'>{genre}</Genre>
				<Rating color='white' count={rating}/>
				<Title typeTitle='h2' size='m'>{title}</Title>
			</div>
		</Link>
);