import {ReactNode} from "react";

export interface SliderProps {
	slides: ISlide[]
	children: ReactNode
}

export interface ISlide {
	text: string;
}