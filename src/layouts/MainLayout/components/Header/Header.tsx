import React, { FC } from 'react';
import { FeaturedMovie } from "components/FeaturedMovie/FeaturedMovie";
import {HeaderProps} from "./Header.props";
import styles from './Header.module.scss';

export const Header: FC<HeaderProps> = () => {

    return (
        <header className={styles.header}>
          <FeaturedMovie />
        </header>
    );
};