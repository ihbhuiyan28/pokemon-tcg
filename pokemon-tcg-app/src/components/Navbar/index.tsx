import { useAuthStore } from '@/hooks/authHook';
import { useCartStore } from '@/hooks/cartHook';
import { Button, Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

function CartLabel({ item }: { item: number }) {
    if (item === 0) return <></>
    return (
        <span className='font-semibold h-4 mr-4 text-white'>{item}</span>
    );
}

export function NavbarLayout() {
    const { username, setUsername, setPassword } = useAuthStore();
    const { count } = useCartStore();

    useEffect(() => {
        const _username = localStorage.getItem('username');
        const _password = localStorage.getItem('password');
        setUsername(_username || '');
        setPassword(_password || '');
    }, [])

    return (
        <Navbar border className="bg-blue-500">
            <Navbar.Brand as={Link} href='/'>
                <Image unoptimized={true} src={`/pokeball.png`} alt='pokeball' width={80} height={80} />
                <span className="font-semibold ml-4 text-2xl text-white">PokemonTCG</span>
            </Navbar.Brand>
            <div className="grid grid-cols-2 gap-2 w-38">
                <Link
                    href={'/cart'}
                    className='bg-orange-500 font-semibold px-4 py-2 rounded-lg text-center text-white'
                >
                    <CartLabel item={count()} />
                    Cart
                </Link>
                <Button className="bg-red-500">
                    {
                        username === 'codecamp' ? <span>{username}</span> : <Link href={`/signin`}>Sign in</Link>
                    }
                </Button>
                {
                    username === 'codecamp' &&
                    <Button
                        className="bg-blue-500 rounded text-white"
                        onClick={
                            () => {
                                localStorage.clear();
                                setUsername('');
                                setPassword('');
                            }
                        }>
                        Sign out
                    </Button>
                }
            </div>
        </Navbar>
    );
}
