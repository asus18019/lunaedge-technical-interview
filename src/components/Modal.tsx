import Button from './Button';
import { useEffect, useRef } from 'react';

interface ModalProps {
	closeModal: () => void;
}

const Modal = ({ closeModal }: ModalProps) => {
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutsideDropdown = (event: MouseEvent) => {
			if(event.target === modalRef.current) {
				closeModal();
			}
		};
		document.addEventListener('click', handleClickOutsideDropdown);
		return () => document.removeEventListener('click', handleClickOutsideDropdown);
	}, []);

	return (
		<div className="absolute bg-[#e5e7ebcc] w-full h-full z-10 flex justify-center items-center" ref={ modalRef }>
			<div className="drop-shadow-md bg-white py-8 px-10 rounded-md min-w-[600px]">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-medium">Modal title</h1>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 }
					     onClick={ closeModal }
					     stroke="currentColor" className="w-6 h-6 cursor-pointer">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
					</svg>
				</div>
				<div className="my-6">
					Content
				</div>
				<div className="flex justify-between">
					<div></div>
					<div>
						<Button onClickAction={ closeModal } text="Close" type="text"/>
						<Button onClickAction={ closeModal } text="Close" type="primary"/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;