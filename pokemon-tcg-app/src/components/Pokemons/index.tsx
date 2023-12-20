import { useCartStore } from '@/hooks/cartHook';
import { usePokemonSets } from '@/hooks/pokemonHook';
import { useState } from 'react';
import { PageNotFound } from '../NotFound';
import Image from 'next/image';
import { Button, Modal } from 'flowbite-react';
import { Set } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import Link from 'next/link';

export function Pokemons() {
    const { data, isError } = usePokemonSets();
    const { addToCart } = useCartStore();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalState, setModalState] = useState<Set>();

    if (isError) return <PageNotFound />

    return (
        <>
            <div className="content-center grid grid-cols-3 gap-4">
                {
                    data?.map((pokemon) => {
                        const { id, images, name } = pokemon;
                        return (
                            <div key={id} className="border flex flex-col items-center justify-center py-2 shadow-lg">
                                <Link
                                    href={`/pokemons/${id}`}
                                >
                                    <Image
                                        unoptimized={true}
                                        className="h-36 w-60"
                                        src={`${images.logo}`}
                                        alt={`${name}`}
                                        height={120}
                                        width={180}
                                    />
                                </Link>
                                <p className="font-semibold text-center">{name}</p>
                                <Button
                                    className="bg-blue-500 mt-4"
                                    onClick={() => {
                                        setOpenModal(true);
                                        setModalState(pokemon);
                                        //carts.push(pokemon as ICartItem);
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
                        <div>
                            <div>
                                <Image
                                    unoptimized={true}
                                    className="h-36 w-60"
                                    src={`${modalState?.images.logo}`}
                                    alt={`${modalState?.name}`}
                                    height={120}
                                    width={180}
                                />
                            </div>
                            <div>{modalState?.name}</div>
                            <div>{modalState?.series}</div>
                            <div>{modalState?.total}</div>
                            <div>{modalState?.updatedAt}</div>
                        </div>
                        <Modal.Footer>
                            <button
                                type="button"
                                className="bg-blue-500 p-3 text-white rounded"
                                onClick={() => {
                                    addToCart(modalState as Set);
                                    setOpenModal(false);
                                }}
                            >
                                Add to Cart
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 p-3 text-white rounded"
                                onClick={
                                    () => setOpenModal(false)
                                }>
                                Close
                            </button>
                        </Modal.Footer>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
}
