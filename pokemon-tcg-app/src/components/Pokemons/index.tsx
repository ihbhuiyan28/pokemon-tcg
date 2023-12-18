import { useCartStore } from '@/hooks/cartHook';
import { usePokemonSets } from '@/hooks/pokemonHook';
import { useState } from 'react';
import { PageNotFound } from '../NotFound';
import Image from 'next/image';
import { Button, Modal } from 'flowbite-react';
import { Set } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { ICartItem } from '@/types';

export function Pokemons() {
    const { data, isError } = usePokemonSets();
    const { carts, addToCart } = useCartStore();
    const [openModal, setOpenModal] = useState<boolean>(false);

    if (isError) return <PageNotFound />

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
                                        carts.push(pokemon as ICartItem);
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
                                src={`${carts[0].images.logo}`}
                                alt={`${carts[0].name}`}
                                height={120}
                                width={180}
                            />
                            <p className="font-semibold text-center">Name: {carts[0].name}</p>
                            <p className="font-semibold text-center">Series: {carts[0].series}</p>
                            <p className="font-semibold text-center">Total: {carts[0].total}</p>
                            <p className="font-semibold text-center">PTCGO Code: {carts[0].ptcgoCode}</p>
                            <p className="font-semibold text-center">Release Date: {carts[0].releaseDate}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="flex flex-row justify-end items-end">
                        <Button
                            className="bg-rose-500 rounded text-white"
                            onClick={
                                () => {
                                    addToCart(carts[0] as Set);
                                    setOpenModal(false);
                                    // localStorage.setItem('modalSet', JSON.stringify(cart.push(modalSet as ICartItem)));
                                }
                            }
                        >
                            Add to Cart
                        </Button>
                        <Button className="bg-blue-500 rounded text-white" onClick={() => setOpenModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}
