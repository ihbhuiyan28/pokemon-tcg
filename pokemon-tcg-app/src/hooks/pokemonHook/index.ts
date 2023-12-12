import { QueryKeys } from "@/enums";
import { GetAllPokemons, GetPokemonById } from "@/services/pokemons.services";
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk"

function usePokemonSets() {
    const query = useQuery<Set[]>({
        queryKey: [QueryKeys.CardSets],
        queryFn: async function () {
            const _getAllPokemons = await GetAllPokemons();
            return _getAllPokemons;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true
    });
    return query;
}

function usePokemonSet() {
    const router = useRouter();
    const pokemonId = router.query.pokemonId;
    const query = useQuery<Set>({
        queryKey: [QueryKeys.CardSet],
        queryFn: async function () {
            const _getPokemonById = await GetPokemonById(pokemonId as string);
            return _getPokemonById;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: true
    });
    return query;
}

export {
    usePokemonSets,
    usePokemonSet
}
