import { FC } from 'react';
import clsx from "clsx";
import { RatingProps } from './Rating.props'
import styles from './Rating.module.scss';

export const Rating: FC<RatingProps> = ( {
	color,
	count
} ) => {

	const components = Array.from({ length: count }, (_, index) => (
		<svg key={index} viewBox='0 0 24 24' className={styles.star}>
			<use href='/icons/sprite.svg#star' />
		</svg>
	));

	return (
    <div className={clsx(styles.stars, {
				[styles.white]: color === 'white'
			})}
		>
			{components}
		</div>
  );
};