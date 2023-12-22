import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import Badge from './components/Badge';
import Dropdown from './components/Dropdown';
import MultiselectIcons from './components/MultiselectIcons';
import Input from './components/Input';
import Modal from './components/Modal';
import Button from './components/Button';
import { firstNameRules } from './config/inputValidationRules';
import { API_LINK } from './config/apiUrl';

interface IFormInput {
	firstName: string;
	lastName: string;
	team: string[];
}

export type Sprite = {
	name: string,
	sprite: string
}

function App() {
	const [badges, setBadges] = useState<string[]>([]);
	const [sprites, setSprites] = useState<Sprite[]>([]);
	const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false);
	const [isActiveModal, setIsActiveModal] = useState<boolean>(false);
	const [pokemons, setPokemons] = useState<{ name: string, url: string }[]>([]);
	const [searchPokemon, setSearchPokemon] = useState<string>('');

	const dropDownRef = useRef<HTMLDivElement | null>(null);
	const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm<IFormInput>();

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

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if(!data.team || data.team.length !== 4) {
			return setError('team', {
				type: 'custom',
				message: `You must chose only 4 pokemons but you've chosen ${ badges.length }`
			});
		}
		setIsActiveModal(!isActiveModal);

		const pokemonsDetailedPromises = [];
		for(const pokemon of badges) {
			pokemonsDetailedPromises.push(axios.get(`${ API_LINK }pokemon/${ pokemon }`));
		}

		const fetchedSprites: Sprite[] = [];
		Promise.all(pokemonsDetailedPromises).then(result => {
			result.forEach(result => {
				fetchedSprites.push({ name: result.data.species.name, sprite: result.data.sprites.front_default });
			});
			setSprites(fetchedSprites);
		});
	};

	const handleOnClickBadge = (value: string) => {
		if(badges.includes(value)) return;
		setValue('team', [...badges, value]);
		setBadges([...badges, value]);
		handlePokemonErrors(badges.length + 1);
	};

	const handleRemoveBadge = (value: string) => {
		const updatedBadges = badges.filter(badge => badge !== value);
		setValue('team', updatedBadges);
		setBadges(updatedBadges);
		handlePokemonErrors(updatedBadges.length);
	};

	const handlePokemonErrors = (selectedPokemons: number) => {
		if(selectedPokemons == 4) {
			return clearErrors('team');
		}

		setError('team', {
			type: 'custom',
			message: `You must chose only 4 pokemons but you've chosen ${ selectedPokemons }`
		});
	};

	const handleCloseModal = () => {
		setIsActiveModal(!isActiveModal);
		setBadges([]);
		setValue("firstName", "");
		setValue("lastName", "");
	}

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			{ isActiveModal && <Modal closeModal={ handleCloseModal } sprites={ sprites }/> }
			<form
				className="border rounded border-solid border-[#0000001A] p-4 shadow-md w-[500px]"
				onSubmit={ handleSubmit(onSubmit) }
			>
				<h2 className="font-semibold text-2xl text-center">Pokémon Battle Tower Registration</h2>
				<Input id={ 'firstName' } errors={ errors.firstName } register={ register('firstName', firstNameRules) }/>
				<Input id={ 'lastName' } errors={ errors.lastName } register={ register('lastName', firstNameRules) }/>

				<div className="mx-4 my-6">
					<div className="flex justify-between">
						<label className="text-[#18171C] font-medium">Your team</label>
						<p className="text-[#605F6D]">Optional</p>
					</div>
					<div
						id="team"
						className={ clsx(
							'w-full border border-[#C9C8D0] rounded-lg my-2 px-4 py-2 relative flex justify-between ',
							isActiveDropdown && 'outline outline-2 outline-[#7360CC]'
						) }
						onClick={ () => setIsActiveDropdown(!isActiveDropdown) }
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
					<p className={ clsx('text-[#605F6D]', errors.team && 'text-red-400') }>
						{ errors.team ? errors.team.message : 'This information is required' }
					</p>
				</div>
				<div className="mx-4 my-6">
					<Button onClickAction={ () => {} } text="Submit" type="primary"/>
				</div>
			</form>
		</div>
	);
}

export default App;