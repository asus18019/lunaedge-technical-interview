import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Badge from './components/Badge';
import Dropdown from './components/Dropdown';
import MultiselectIcons from './components/MultiselectIcons';
import Input from './components/Input';

interface IFormInput {
	firstName: string;
	lastName: string;
	team: string[];
}

const API_LINK = 'https://pokeapi.co/api/v2/';

function App() {
	const [badges, setBadges] = useState<string[]>([]);
	const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);
	const [pokemons, setPokemons] = useState<{ name: string, url: string }[]>([]);
	const [searchPokemon, setSearchPokemon] = useState<string>('');

	const dropDownRef = useRef<HTMLDivElement | null>(null);
	const { register, handleSubmit, setValue } = useForm<IFormInput>();

	useEffect(() => {
		const handleClickOutsideDropdown = (event: MouseEvent) => {
			const targetNode = event.target as Node;
			if(targetNode.contains(dropDownRef.current)) {
				setIsActiveDropdown(false);
			}
		};
		document.addEventListener('click', handleClickOutsideDropdown);
		return () => document.removeEventListener('click', handleClickOutsideDropdown);
	}, []);

	useEffect(() => {
		axios.get(API_LINK + 'pokemon')
			.then(data => setPokemons(data.data.results));
	}, []);

	const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

	const handleOnClickBadge = (value: string) => {
		if(badges.includes(value)) return;
		setValue("team", [...badges, value]);
		setBadges([...badges, value]);
	};

	const handleRemoveBadge = (value: string) => {
		const updatedBadges = badges.filter(badge => badge !== value);
		setValue("team", updatedBadges);
		setBadges(updatedBadges);
	};

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<form
				className="border rounded border-solid border-[#0000001A] p-4 shadow-md w-[500px]"
				onSubmit={ handleSubmit(onSubmit) }
			>
				<h2 className="font-semibold text-2xl text-center">Pokémon Battle Tower Registration</h2>
				<Input id={ "firstName" } register={ register('firstName') }/>
				<Input id={ "lastName" } register={ register('lastName') }/>

				<div className="mx-4 my-6">
					<div className="flex justify-between">
						<label className="text-[#18171C] font-medium">Your team</label>
						<p className="text-[#605F6D]">Optional</p>
					</div>
					<div
						className={ clsx('w-full border border-[#C9C8D0] rounded-lg my-2 px-4 py-2 relative flex justify-between ', isActiveDropdown && 'outline outline-2 outline-[#7360CC]') }
						onClick={ () => setIsActiveDropdown(!isActiveDropdown) }
						id="team"
						{ ...register('team') }
						ref={ dropDownRef }
					>
						{ badges.length ? (
							<div className="whitespace-nowrap overflow-x-auto">
								{ badges.map(elem => (
									<Badge
										key={ elem }
										elem={ elem }
										handleRemoveBadge={ handleRemoveBadge }
									/>
								)) }
							</div>
						) : (
							<div className="">
								<p className="text-[#999] select-none cursor-pointer">Select your team</p>
							</div>
						) }
						<MultiselectIcons clearBadges={ setBadges } isActiveDropdown={ isActiveDropdown }/>
					</div>
					{ isActiveDropdown && (
						<Dropdown
							pokemons={ pokemons }
							searchPokemon={ searchPokemon }
							setSearchPokemon={ setSearchPokemon }
							badges={ badges }
							handleOnClickBadge={ handleOnClickBadge }
						/>
					) }
				</div>
				<div className="mx-4 my-6">
					<button
						className="h-8 bg-[#4B2EBE] rounded text-white px-4 hover:bg-[#7069E7] focus:bg-[#7069E7] outline-2 outline-[#4B2EBE]"
						type="submit">Submit
					</button>
				</div>
			</form>
		</div>
	);
}

export default App;
