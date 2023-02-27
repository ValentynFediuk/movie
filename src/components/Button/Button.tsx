import React from 'react';
import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';
import clsx from "clsx";

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
		})}
		onClick={handleClick}
		{...props}
	>
		{children}
	</button>
);
