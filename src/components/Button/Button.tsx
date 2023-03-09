'use client'

import React from 'react'
import clsx from 'clsx'
import { ButtonProps } from './Button.props'
import styles from './Button.module.scss'

export const Button: React.FC<ButtonProps> = ({
  children,
  typeBtn,
  appearance,
  loadingData,
  handleClick,
  ...props
}) => (
  <button
    type={typeBtn === 'submit' ? 'submit' : 'button'}
    className={clsx(styles.btn, {
      [styles.primary]: appearance === 'primary',
      [styles.secondary]: appearance === 'secondary',
      [styles.white]: appearance === 'white',
      [styles.gradient]: appearance === 'gradient',
      [styles.transparent]: appearance === 'transparent',
    })}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
)
