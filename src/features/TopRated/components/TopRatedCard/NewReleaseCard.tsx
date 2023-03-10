import { FC } from 'react'
import { Genre, Rating, Title } from 'components'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { Route } from 'next'
import { TopRatedCardProps } from './TopRatedCard.props'
import styles from './TopRatedCard.module.scss'

export const NewReleaseCard: FC<TopRatedCardProps> = ({
  poster_path,
  genres,
  vote_average,
  original_title,
  homepage,
  className,
}) => (
  <Link
    href={homepage?.length ? (`${homepage}`) as Route : ('!#') as Route}
    className={clsx(styles.card, className)}
  >
    <Image
      fill
      className={styles.image}
      src={ poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : '/#'}
      alt='Picture of the author'
    />
    <div className={styles.description}>
      <Genre appearance='teal'>
        {genres?.map((genre, index) =>
          index !== genres.length - 1 ? `${genre.name}, ` : genre.name
        )}
      </Genre>
      <Rating color='white' count={Number(vote_average?.toFixed(0))} />
      <Title typeTitle='h3' size='s'>
        {original_title}
      </Title>
    </div>
  </Link>
)
