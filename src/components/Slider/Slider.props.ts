import { SetStateAction } from "react";

export interface SliderProps {
	slides: ISlide[]
	slidesPerView: number | "auto"
	dots?: boolean
	spacing?: number
	setPerPage: SetStateAction<number>
}

export interface ISlide {
	id: number
	vote_average: number
	overview?: string
	backdrop_path: string
	original_title: string
}