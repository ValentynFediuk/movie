import { ReactNode } from "react";

export interface SliderProps {
	slides: ISlide[]
	children: ReactNode
}

export interface ISlide {
	id: number
	genre: string
	rating: number
	title: string
	description: string
}