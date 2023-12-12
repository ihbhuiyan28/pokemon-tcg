import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { create } from "zustand";

interface ICartItem extends Set {
    count: number;
}

interface ICartStore {
    cart: ICartItem[],
    count: () => number,
    addToCart: (_set?: Set) => void;
    removeCart: (id: string) => void;
}

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
    cart: [],
    count: () => {
        const { cart } = get();
        if (cart.length) {
            return cart.map(item => item.count).reduce((prev, curr) => prev + curr);
        }
        return 0;
    },
    addToCart: (_set?: Set) => {
        const { cart } = get();
        const updatedCart = updateCart(_set as Set, cart);
        set({ cart: updatedCart });
    },
    removeCart: (id: string) => {
        const { cart } = get();
        const updatedCart = removeCart(id, cart);
        set({ cart: updatedCart });
    }
}));
