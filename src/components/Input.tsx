import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
	register: UseFormRegisterReturn<string>;
	id: string;
	errors: FieldError | undefined
}

const Input = ({ register, id, errors }: InputProps) => {
	return (
		<div className="mx-4 my-6">
			<div className="flex justify-between">
				<label className="text-[#18171C] font-medium" htmlFor={ id }>First Name</label>
				<p className="text-[#605F6D]">Optional</p>
			</div>
			<input
				className="w-full border border-[#C9C8D0] rounded-lg my-2 px-4 py-2 outline-2 outline-[#7360CC]"
				placeholder="Your First Name..."
				type="text"
				id={ id }
				{ ...register }
			/>
			<p className={ clsx("text-[#605F6D]", errors && "text-red-400")}>{ errors ? errors.message : "This information is required" }</p>
		</div>
	);
};

export default Input;