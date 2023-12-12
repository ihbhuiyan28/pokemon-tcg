import { QueryKeys } from '@/enums';
import { useCartStore } from '@/hooks/cartHook';
import { usePokemonSets } from '@/hooks/pokemonHook';
import { GetAllPokemons, GetPokemonById } from '@/services/pokemons.services';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { PageNotFound } from '../NotFound';
import Image from 'next/image';
import { Button, Modal } from 'flowbite-react';
import { Set } from 'pokemon-tcg-sdk-typescript/dist/sdk';

// export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: { dehydratedStates: DehydratedState } }> {
//     const queryClient = new QueryClient();

//     await queryClient.prefetchQuery({
//         queryKey: [QueryKeys.CardSets],
//         queryFn: async function () {
//             const pokemonSets = await GetAllPokemons();
//             return pokemonSets;
//         }
//     });

//     return {
//         props: {
//             dehydratedStates: dehydrate(queryClient)
//         }
//     };
// }





export function Pokemons() {
    const { data, isError, isLoading } = usePokemonSets();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalSet, setModalSet] = useState<Set>();
    const { addToCart } = useCartStore();

    if (isError) return <PageNotFound />

    //if (isLoading) return <Loading />

    return (
        <>
            <div className="content-center grid grid-cols-3 gap-4">
                {
                    data?.map((pokemon) => {
                        const { id, images, name } = pokemon;
                        return (
                            <div key={id} className="border flex flex-col items-center justify-center py-2 shadow-lg">
                                <Image
                                    unoptimized={true}
                                    className="h-36 w-60"
                                    src={`${images.logo}`}
                                    alt={`${name}`}
                                    height={120}
                                    width={180}
                                />
                                <p className="font-semibold text-center">{name}</p>
                                <Button
                                    className="bg-blue-500 mt-4"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setModalSet(pokemon);
                                    }}
                                >
                                    Quick View
                                </Button>
                            </div>
                        );
                    })
                }
            </div>
            {
                openModal &&
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Body>
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <Image
                                unoptimized={true}
                                className="h-36 w-60"
                                src={`${modalSet?.images.logo}`}
                                alt={`${modalSet?.name}`}
                                height={120}
                                width={180}
                            />
                            <p className="font-semibold text-center">Name: {modalSet?.name}</p>
                            <p className="font-semibold text-center">Series: {modalSet?.series}</p>
                            <p className="font-semibold text-center">Total: {modalSet?.total}</p>
                            <p className="font-semibold text-center">PTCGO Code: {modalSet?.ptcgoCode}</p>
                            <p className="font-semibold text-center">Release Date: {modalSet?.releaseDate}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="flex flex-row justify-end items-end">
                        <Button className="bg-rose-500 rounded text-white" onClick={() => { addToCart(modalSet); setOpenModal(false); }}>Add to Cart</Button>
                        <Button className="bg-blue-500 rounded text-white" onClick={() => setOpenModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}
