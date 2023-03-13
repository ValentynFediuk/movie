import { SetStateAction } from 'react'
import { IGenre } from 'types'

export interface ReactSelectProps {
	className: string
	options: IGenre[]
	onChange: SetStateAction<any>
}