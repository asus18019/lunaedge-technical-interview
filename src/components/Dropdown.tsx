import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

interface DropdownProps {
	pokemons: { name: string, url: string }[],
	searchPokemon: string,
	setSearchPokemon: Dispatch<SetStateAction<string>>,
	badges: string[],
	handleOnClickBadge: (value: string) => void
}

const Dropdown = ({ pokemons, searchPokemon, setSearchPokemon, badges, handleOnClickBadge }: DropdownProps) => {
	return (
		<div
			className="absolute bg-white w-[434px] max-h-[200px] overflow-auto border border-solid rounded-lg"
		>
			<input
				className="w-full border border-[#C9C8D0] rounded-lg mb-2 px-4 py-2 outline-none"
				placeholder="Search..."
				type="text"
				value={ searchPokemon }
				onChange={ e => setSearchPokemon(e.target.value) }
			/>
			{ pokemons.filter(pokemon => pokemon.name.includes(searchPokemon)).map(pokemon => (
				<p
					key={ pokemon.name }
					onClick={ () => handleOnClickBadge(pokemon.name) }
					className={ clsx(
						'py-2 px-3 cursor-pointer hover:bg-gray-100',
						badges.includes(pokemon.name) && 'bg-gray-100 text-gray-400')
					}
				>
					{ pokemon.name }</p>
			)) }
		</div>
	);
};

export default Dropdown;