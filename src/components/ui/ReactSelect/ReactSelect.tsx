import { FC, useId } from 'react'
import Select from 'react-select'
import { ReactSelectProps } from './ReactSelect.props'
import { customStyles } from './selectStyle'

export const ReactSelect: FC<ReactSelectProps> = ({ className, options, onChange }) => (
		<Select
			className={className}
			options={options}
			styles={customStyles}
			instanceId={useId()}
			onChange={onChange}
		/>
);