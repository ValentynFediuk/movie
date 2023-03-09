'use client'

import { FC } from 'react';
import clsx from "clsx";
import { GenreProps } from './Genre.props'
import styles from './Genre.module.scss';

export const Genre: FC<GenreProps> = ( {
  children,
  appearance
}) => (
    <div
      className={clsx(styles.genre, {
        [styles.teal]: appearance === 'teal'
      })}
    >
      {children}
    </div>
);