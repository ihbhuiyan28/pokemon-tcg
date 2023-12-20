import { usePokemonSet, useUpdateSetName } from "@/hooks/pokemonHook";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PokemonById() {
    const router = useRouter();
    const pokemonId = router.query.pokemonId;
    const { data } = usePokemonSet(pokemonId);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { mutate: updateName } = useUpdateSetName();
    const [newName, setNewName] = useState<string>('');

    if (data !== undefined) {
        const tempName = newName === '' ? data.name : newName;
        return (
            <>
                <div className="w-full grid place-items-center my-8">
                    <div>
                        <Image
                            unoptimized={true}
                            className="h-36 w-60"
                            src={`${data.images.logo}`}
                            alt={`${data.name}`}
                            height={120}
                            width={180}
                        />
                    </div>
                    <div>{tempName}</div>
                    <div>{data.series}</div>
                    <div>{data.total}</div>
                    <div>{data.updatedAt}</div>
                    <div>
                        <button
                            className="bg-blue-500 p-2 rounded shadow text-white"
                            onClick={
                                () => setOpenModal(true)
                            }
                        >
                            Update
                        </button>
                    </div>
                </div>
                {
                    openModal &&
                    <Modal show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Body>
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                className="rounded"
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Update name"
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white ml-4 px-4 py-2 rounded"
                                onClick={
                                    () => {
                                        updateName({ setId: data.id, setName: newName });
                                        setOpenModal(false);
                                    }}>
                                Update
                            </button>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setOpenModal(false)}>Close</button>
                        </Modal.Footer>
                    </Modal>
                }
            </>
        );
    }
}
