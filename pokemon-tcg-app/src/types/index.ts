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
