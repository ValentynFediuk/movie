'use client'

import { FC } from 'react'
import { Button, Genre, Rating, Title } from 'components'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next';
import { FeaturedMovieProps } from './FeaturedMovie.props'
import styles from './FeaturedMovie.module.scss'

export const FeaturedMovie: FC<FeaturedMovieProps> = ({
  backdrop_path,
  vote_average,
  original_title,
  className,
  overview,
  genres,
  homepage,
}) => (
  <div className={clsx(styles.movie, className)}>
    <Image
      fill
      className={styles.movie_image}
      src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
      alt='Picture of the author'
    />
    <div className={styles.movie_info}>
      <Genre appearance='teal'>
        {genres?.map((genre, index) =>
          index !== genres.length - 1 ? `${genre.name}, ` : genre.name
        )}
      </Genre>
      <Rating color='white' count={Number(vote_average?.toFixed(0))} />
      <Title typeTitle='h1' size='l'>
        {original_title}
      </Title>
      <p>{overview}</p>
      <Button appearance='gradient' typeBtn='button'>
        <Link href={homepage?.length ? (`${homepage}`) as Route : ('!#') as Route}>
          {homepage?.length ? 'Watch now' : 'Not available'}
        </Link>
      </Button>
    </div>
  </div>
)
