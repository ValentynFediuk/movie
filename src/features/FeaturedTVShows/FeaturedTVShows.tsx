import { FC } from 'react'
import { Button } from "components/Button/Button";
import Link from 'next/link';
import { Slider } from "components/Slider/Slider";
import { featuredTvShowsData } from "features/FeaturedTVShows/featured-tv-shows.data";
import styles from './FeaturedTVShows.module.scss';
import { FeaturedTVShowsProps } from './FeaturedTVShows.props'
import { FeaturedTVShowCard } from './components/FeaturedTVShowCard/FeaturedTVShowCard';

export const FeaturedTVShows: FC<FeaturedTVShowsProps> = () => (
    <div className={styles.wrapper}>
      <Button appearance='transparent' typeBtn='button'>
        <Link href='/tv-show'>
          <span>Featured TV shows</span>
          <svg viewBox='0 0 8 12'>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </Link>
      </Button>
      <div className={styles.releases}>
        {featuredTvShowsData &&
          <Slider
            slides={featuredTvShowsData}
            slidesPerView='auto'
          >
            {featuredTvShowsData.map(release => (
              <FeaturedTVShowCard key={release.id} {...release} className='keen-slider__slide' />
            ))}
          </Slider>
        }
      </div>
    </div>
  )
