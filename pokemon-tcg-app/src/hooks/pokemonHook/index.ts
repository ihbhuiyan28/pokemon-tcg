import { QueryKeys } from "@/enums";
import { EditSetName, GetAllPokemons, GetPokemonById } from "@/services/pokemons.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

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

function usePokemonSet(pokemonId: any) {
    const query = useQuery<Set>({
        queryKey: [QueryKeys.CardSet],
        queryFn: async function () {
            const _getPokemonById = await GetPokemonById(pokemonId as string);
            return _getPokemonById;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        enabled: pokemonId != undefined
    });
    return query;
}

function useUpdateSetName() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ setId, setName }: { setId: string; setName: string }) => EditSetName(setId, setName),
        onSuccess: (params, variables) => {
            console.log("Successful!");
            queryClient.setQueryData([QueryKeys.CardSets], (initialSets: Set[]) => {
                let foundSet = initialSets?.find((set) => set.id === variables.setId);
                if (foundSet) {
                    foundSet.name = variables.setName;
                }
                return initialSets;
            });
        },
        onError: (e) => { console.log("Error: ", e) }
    });
}

export {
    usePokemonSets,
    usePokemonSet,
    useUpdateSetName
}
