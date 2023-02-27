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
						Set in Detroit City during the year 2036, the city has been revitalized by the invention and introduction of Androids into everyday life.
						But when Androids start behaving as if they are alive, events begin to spin out of
						Step into the roles of the story’s pivotal three playable characters, each with unique perspectives as they face their new way of life.
					</p>
					<Button appearance='gradient' typeBtn='button'>
						Watch now
					</Button>
				</div>
			</div>
		</div>
	);
};