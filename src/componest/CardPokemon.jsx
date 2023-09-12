import React from 'react'
import { Link } from 'react-router-dom'

export const CardPokemon = ({pokemon}) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'> 
      <div className="card-img">
        <img 
          src={pokemon.sprites.other.dream_world.front_default} 
          alt={`Pokemon ${pokemon.name}`} 
        />
      </div>
      <div className="card-info">
        {/* id del pokemon */}
        <span className="pokemon-id">Nº {pokemon.id}</span>
        {/* Nombre del pokemon */}
        <h3>{pokemon.name}</h3>
        <div className="card-types">
          {/* Tipo del pokemon */}
          {pokemon.types.map(type => (
            <span key={type.type.name} className={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
