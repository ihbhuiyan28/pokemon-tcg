import { ICartItem, ICartStore } from "@/types";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

function updateCart(_set: Set, cart: ICartItem[]): ICartItem[] {
    const cartItem = { ..._set, count: 1 } as ICartItem;
    const setOnCart = cart.map(item => item.id).includes(_set.id);

    if (!setOnCart) {
        cart.push(cartItem);
    } else {
        return cart.map(item => {
            if (item.id === _set.id) {
                return { ...item, count: item.count + 1 } as ICartItem;
            }
            return item;
        });
    }

    return cart;
}

function removeCart(id: string, cart: ICartItem[]): ICartItem[] {
    const _removeCart = cart.map((item) => {
        if (item.id == id) {
            return { ...item, count: item.count - 1 }
        }
        return item;
    }).filter(item => {
        return item.count;
    })

    return _removeCart;
}

export const useCartStore = create<ICartStore>((set, get) => ({
    carts: [],
    count: () => {
        const { carts } = get();
        if (carts.length) {
            return carts.map(item => item.count).reduce((prev, curr) => prev + curr);
        }
        return 0;
    },
    addToCart: (_set) => {
        const { carts } = get();
        const updatedCart = updateCart(_set, carts);
        set({ carts: updatedCart });
    },
    removeCart: (id: string) => {
        const { carts } = get();
        const updatedCart = removeCart(id, carts);
        set({ carts: updatedCart });
    }
}));
