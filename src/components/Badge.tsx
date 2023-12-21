import React from 'react';

interface BadgeProps {
	elem: string,
	handleRemoveBadge: (value: string) => void
}

const Badge = ({ elem, handleRemoveBadge }: BadgeProps) => {
	const handleClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		e.stopPropagation();
		handleRemoveBadge(elem);
	};

	return (
		<div className="inline-flex py-0.5 px-2.5 rounded-full bg-[#F4F4F6] mr-2 w-auto">
			<p>{ elem }</p>
			<svg onClick={ handleClose }
			     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
			     stroke="currentColor" className="w-5 h-5 self-center cursor-pointer">
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
			</svg>
		</div>
	);
};

export default Badge;