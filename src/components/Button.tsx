import clsx from 'clsx';

interface ButtonProps {
	onClickAction: () => void,
	text: string,
	type: 'primary' | 'text'
}

const Button = ({ onClickAction, text, type }: ButtonProps) => {
	return (
		<button
			type="submit"
			className={ clsx(
				"h-8 rounded ml-2 px-4 first:ml-0 font-medium",
				type === "primary" && "bg-[#4B2EBE] text-white hover:bg-[#7069E7] focus:bg-[#7069E7] outline-2 outline-[#4B2EBE]",
				type === "text" && "bg-transparent text-black hover:bg-[#F0F2FE] hover:text-[#7F7AEA] outline-2 outline-[#4B2EBE]"
			) }
			onClick={ onClickAction }
		>
			{ text }
		</button>
	);
};

export default Button;