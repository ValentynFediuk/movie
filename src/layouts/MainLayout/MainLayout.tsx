import { FeaturedMovie, Slider } from 'components/index';
import React, { FC } from 'react';
import clsx from "clsx";
import { Header } from "./components";
import { MainLayoutProps } from "./MainLayout.props";
import {slides} from './slider.data'
import styles from './MainLayout.module.scss';

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
    <div className={styles.layout}>
      <Header>
        <Slider slides={slides}>
          {slides.map(slide => (
            <FeaturedMovie key={slide.id} {...slide} className={clsx('keen-slider__slide')} />
          ))}
        </Slider>
      </Header>
        {children}
    </div>
  );