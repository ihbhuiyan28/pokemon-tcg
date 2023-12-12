import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

async function GetAllPokemons() {
    const _getAllPokemons = await PokemonTCG.getAllSets();
    return _getAllPokemons;
}

async function GetPokemonById(pokemonId: string) {
    const _getPokemonById = await PokemonTCG.findSetByID(pokemonId);
    return _getPokemonById;
}

export {
    GetAllPokemons,
    GetPokemonById
}
