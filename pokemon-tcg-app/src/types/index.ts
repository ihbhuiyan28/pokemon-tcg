import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export interface IAuthStore {
    username: string;
    password: string;
    setUsername: (username: string) => void;
    setPassword: (password: string) => void;
}

export interface ISignin {
    username: string;
    password: string;
}

export interface ICartItem extends Set {
    count: number;
}

export interface ICartStore {
    carts: ICartItem[],
    count: () => number,
    addToCart: (_set: Set) => void;
    removeCart: (id: string) => void;
}
