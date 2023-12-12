import { useAuthStore } from '@/hooks/authHook';
import { ISignin } from '@/types';
import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function SigninPage() {
    const { username, password, setUsername, setPassword } = useAuthStore();
    const router = useRouter();
    const { formState: { errors }, handleSubmit, register } = useForm<ISignin>();

    const onSubmit: SubmitHandler<ISignin> = ({ username, password }) => {
        setUsername(username);
        setPassword(password);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    };

    if (username === 'codecamp' && password === '123') {
        router.push('/');
    }

    useEffect(() => {
        
    }, [username, password]);

    return (
        <div className="grid place-items-center">
            <form action="" className="flex flex-col gap-4 w-80" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="" value="Username" />
                    </div>
                    <TextInput type="text" {...register("username", { required: true })} placeholder="Enter username" />
                    {errors.username && <span className="font-semibold text-red-500 text-sm">Please enter username</span>}
                </div>
                <div>
                    <div className="block mb-2">
                        <Label htmlFor="" value="Password" />
                    </div>
                    <TextInput type="password" {...register("password", { required: true })} placeholder="Enter password" />
                    {errors.password && <span className="font-semibold text-red-500 text-sm">Please enter password</span>}
                </div>
                <Button type="submit" className="bg-blue-500 mt-4">Sign in</Button>
            </form>
        </div>
    );
}
