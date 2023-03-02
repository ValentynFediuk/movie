import React, { FC } from 'react';
import {HeaderProps} from "./Header.props";
import styles from './Header.module.scss';

export const Header: FC<HeaderProps> = ({children}) => (
  <header className={styles.header}>
    {children}
  </header>
);