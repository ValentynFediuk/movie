import { FC } from 'react'
import { Genre, Rating, Title } from "components"
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { NewReleaseCardProps } from './NewReleaseCard.props'
import styles from './NewReleaseCard.module.scss';

export const NewReleaseCard: FC<NewReleaseCardProps> = ( {
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
				<Title typeTitle='h3' size='s'>{title}</Title>
			</div>
		</Link>
);