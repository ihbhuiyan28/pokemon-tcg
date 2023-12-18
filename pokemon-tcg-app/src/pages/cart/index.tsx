import { useCartStore } from "@/hooks/cartHook";
import { Button } from "flowbite-react";
import Image from "next/image";

export default function CartPage() {
    const { carts, removeCart } = useCartStore();

    return (
        <>
            {
                carts.length === 0 ? <span>No items in cart yet!</span> :
                    <div className="border flex flex-col gap-2">
                        {
                            carts &&
                            carts.map((item) => {
                                const { id, images, name } = item;
                                return (
                                    <div key={id} className="border">
                                        <Image
                                            unoptimized={true}
                                            src={`${images.logo}`}
                                            alt={`${name}`}
                                            height={96}
                                            width={96}
                                        />
                                        <p>{name}</p>
                                        <p>
                                            <Button className="bg-red-500 text-white" onClick={() => removeCart(id)}>Remove</Button>
                                        </p>
                                    </div>
                                );
                            })
                        }
                    </div>
            }
        </>
    );
}
