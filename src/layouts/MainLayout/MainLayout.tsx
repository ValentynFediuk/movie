import React, { FC } from 'react'
import { MainLayoutProps } from './MainLayout.props'
import styles from './MainLayout.module.scss'

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
)
