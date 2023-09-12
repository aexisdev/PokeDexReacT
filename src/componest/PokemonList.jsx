import React, {useContext} from "react";
import { PokemonContext } from "../context/PokemonContext";
import { CardPokemon } from "./CardPokemon";
import { Loader } from "./Loader";
//-----------------------------¡------------------------------ 

export const PokemonList = () => {
    //* el loading se toma del provider. debe estar definido de ante mano para funcionar.
    const {allPokemons , loading, filteredPokemons} = useContext(PokemonContext)
    //-----------------------------------------------------
    

    return (
        
        <>
			{loading ? (
				<Loader />
			) : (
				<div className='card-list-pokemon container'>
					{filteredPokemons.length ? (
						<>
							{filteredPokemons.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					) : (
						<>
							{allPokemons.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					)}
				</div>
			)}
		</>
    )
};

//* para hacer que el loader salga en la homepage, se hace pasando sus parametros a traves del provider. repasar logica de esta parte 