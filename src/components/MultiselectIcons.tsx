import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

interface MultiselectIconsProps {
	clearBadges: Dispatch<SetStateAction<string[]>>,
	isActiveDropdown: boolean
}

const MultiselectIcons = ({ clearBadges, isActiveDropdown }: MultiselectIconsProps) => {
	return (
		<div className="flex self-center">
			<svg onClick={ () => clearBadges([]) } cursor="pointer" xmlns="http://www.w3.org/2000/svg"
			     fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor"
			     className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
			</svg>

			<svg cursor="pointer" xmlns="http://www.w3.org/2000/svg" fill="none"
			     viewBox="0 0 24 24"
			     strokeWidth={ 1.5 } stroke="currentColor"
			     className={ clsx('w-6 h-6', isActiveDropdown && 'rotate-180') }>
				<path strokeLinecap="round" strokeLinejoin="round"
				      d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
			</svg>
		</div>
	);
};

export default MultiselectIcons;