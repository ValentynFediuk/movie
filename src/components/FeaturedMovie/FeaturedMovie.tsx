import { FC } from 'react';
import { Button, Genre, Rating, Title } from "components";
import { FeaturedMovieProps } from './FeaturedMovie.props'
import styles from './FeaturedMovie.module.scss';

export const FeaturedMovie: FC<FeaturedMovieProps> = () => {

	return (
		<div className={styles.movie}>
			<div className='container'>
				<div className={styles.movie_info}>
					<Genre appearance='teal'>
						Science Fiction
					</Genre>
					<Rating color='white' count={5}/>
					<Title typeTitle='h1' size='l'>Detroit: Become Human</Title>
					<p>
						In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision
						course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for
						the ages.
					</p>
					<Button appearance='gradient' typeBtn='button'>
						Watch now
					</Button>
				</div>
			</div>
		</div>
	);
};