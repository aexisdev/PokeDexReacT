import {PokemonContext} from './PokemonContext';
// importando el useState 
import {useState, useEffect} from 'react';
import {useForm} from '../hook/useForm'; 

export const PokemonProvider = ({children}) => {


    //? Estado para guardar los pokemon 
    const [allPokemons, setAllPokemons] = useState([]);
    //? estado de getGlobalPokemons 
    const [globalPokemons, setGlobalPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    

    //? Utilizar CustomHooks - useForm
    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch: '', 
    });

    //? Estado simples para la aplicacion
    // para decirle a la aplicacion cuando dejar de cargar 
    const [loading, setLoading] = useState(true);
    // para la funcion de filtrado.
    const [active, setActive] = useState(false);
    //--------------------------------------------------
    //? funcion principal para llamar a los primeros 50 pokemon
    const getAllPokemons = async (limit = 50) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(false);
	};
    //---------------------------------------------------
    //? llamando a todos los pokemones 
    const getGlobalPokemons = async () => {
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(
            `${baseURL}pokemon?limit=10000&offset=0`
        );
        const data = await res.json();
        
        const promises = data.results.map(async pokemon => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        });
        
        const results = await Promise.all(promises);
        setGlobalPokemons(results);
        setLoading(false);
    };
    //---------------------------------------------------
    //? llamar a un pokemon por id 
    const getPokemonByID = async(id) =>{
        const baseURL = 'https://pokeapi.co/api/v2/';
        
        const res = await fetch(`${baseURL}pokemon/${id}`);
        const data = await res.json();
        return data
    }
    //---------------------------------------------------
    useEffect(() =>{
        getAllPokemons();
    },[offset]);
    useEffect(() =>{
        getGlobalPokemons();
    },[]);
    //---------------------------------------------------
    //? BTN Cargar mas.
    const onclickLoadMore = () => {
        setOffset(offset + 50);
    };
    //----------------------------------------------------
    
    //? Filter Funtion + state
    //* typeSelected es un objeto con todos los tipos de pokemon, la api devuelve 20.
    const [ typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    });
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    const handleCheckbox = e => {
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked,
        });

        //? 
        if(e.target.checked){
            const filteredResults = globalPokemons.filter(pokemon => 
                pokemon.types
                .map(type => type.type.name)
                .includes(e.target.name)
                );
                setFilteredPokemons([...filteredPokemons, ...filteredResults]);
        }else{
            const filteredResults = filteredPokemons.filter(pokemon => 
                !pokemon.types
                .map(type => type.type.name)
                .includes(e.target.name)
                );
                setFilteredPokemons([ ...filteredResults]);
        }

    };

    return  (
        <PokemonContext.Provider 
            value={{
                valueSearch, 
                onInputChange, 
                onResetForm,
                allPokemons,
                globalPokemons,
                getPokemonByID,
                onclickLoadMore,
                //loader
                loading,
                setLoading,
                //Btn Filter
                active,
                setActive,
                //filter container Checkbox
                handleCheckbox,
                filteredPokemons
            }} 
        >
            {children}
            
        </PokemonContext.Provider>
    );
};   
