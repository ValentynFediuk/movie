import { Dispatch, SetStateAction } from "react";

export interface SliderProps {
	slideType: 'featured' | 'releases'
	slides: ISlide[]
	paginatedSlides: ISlide[]
	slidesPerView: number | "auto"
	spacing?: number
	perPage?: number
	setPerPage?: Dispatch<SetStateAction<number>>
	setQueryPage: Dispatch<SetStateAction<number>>
	queryPage: number
	getSlides: any
	loading: boolean
}

export interface ISlide {
	id: number
	vote_average: number
	overview?: string
	backdrop_path: string
	original_title: string
}