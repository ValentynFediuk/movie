import { FC } from 'react'
import { Button } from "components/Button/Button";
import Link from 'next/link';
import { Slider } from "components/Slider/Slider";
import styles from './NewReleases.module.scss';
import { NewReleasesProps } from './NewReleases.props'
import { NewReleaseCard } from './components/NewReleaseCard/NewReleaseCard';
import { newReleasesData } from './new-releases.data'

export const NewReleases: FC<NewReleasesProps> = () => (
    <div className={styles.wrapper}>
      <Button appearance='transparent' typeBtn='button'>
        <Link href='/new-release'>
          <span>New releases</span>
          <svg viewBox='0 0 8 12'>
            <use href='/icons/sprite.svg#arrow' />
          </svg>
        </Link>
      </Button>
      <div className={styles.releases}>
        <Slider
          slides={newReleasesData}
          slidesPerView='auto'
          spacing={16}
        >
          {newReleasesData.map(release => (
            <NewReleaseCard key={release.id} {...release} className='keen-slider__slide' />
          ))}
        </Slider>
      </div>
    </div>
  )