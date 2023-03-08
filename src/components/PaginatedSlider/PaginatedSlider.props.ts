import { Dispatch, SetStateAction } from "react";

export interface PaginatedSliderProps {
	slides: ISlide[]
	paginatedSlides: ISlide[]
	perPage?: number
	setPerPage?: Dispatch<SetStateAction<number>>
}

export interface ISlide {
	id: number
	vote_average: number
	overview?: string
	backdrop_path: string
	original_title: string
}