import { FC } from 'react'
import { Genre, Rating, Title } from 'components'
import Image from 'next/image'
import clsx from 'clsx'
import Link from 'next/link'
import { FeaturedTVShowCardProps } from './FeaturedTVShowCard.props'
import styles from './FeaturedTVShowCard.module.scss'

export const FeaturedTVShowCard: FC<FeaturedTVShowCardProps> = ({
  poster_path,
  genres,
  vote_average,
  original_name,
  homepage,
  className,
}) => (
  <Link
    href={homepage?.length ? homepage : '!#'}
    className={clsx(styles.card, className)}
  >
    <Image
      fill
      className={styles.image}
      src={`https://image.tmdb.org/t/p/original${poster_path}`}
      alt='Picture of the author'
    />
    <div className={styles.description}>
      <Genre appearance='teal'>
        {genres?.map((genre, index) =>
          index !== genres.length - 1 ? `${genre.name}, ` : genre.name
        )}
      </Genre>
      <Rating color='white' count={Number(vote_average?.toFixed(0))} />
      <Title typeTitle='h2' size='m'>
        {original_name}
      </Title>
    </div>
  </Link>
)
