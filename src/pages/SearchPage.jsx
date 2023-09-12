import React, {useContext} from 'react'   
import { useLocation } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from '../componest/CardPokemon';
//? importando pokemon context

    //* usamos el contexto importandolo de react.
export const SearchPage = ( ) => {
    //? uso del useLocation.
    const location = useLocation();
    // console.log(location);
    //? el global pokemon tiene los datos de todos los pokemos.
    const { globalPokemons } = useContext(PokemonContext);
    //--------------------------------
    //? usando la funcion filter de javascript.
    const filteredPokemons = globalPokemons.filter(pokemon => pokemon.name.includes(location.state.toLowerCase()));
    // console.log(filteredPokemons);
    //--------------------------------
    return  (
        <>
        <p>estoy en Search Page</p>
        <div className="container">
            <p className="p-search">
                Se encontraron <span>{filteredPokemons.length}</span> {''} resultados:
            </p>
            <div className="card-list-pokemon container">
                {filteredPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id}/>)}
            </div>
        </div>
        
        </>
    )
}
