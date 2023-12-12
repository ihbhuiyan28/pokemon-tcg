import { Pokemons } from '@/components/Pokemons';
import { QueryKeys } from '@/enums';
import { GetAllPokemons } from '@/services/pokemons.services';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.CardSets],
    queryFn: async function () {
      const _allPokemons = await GetAllPokemons();
      return _allPokemons;
    }
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
    revalidate: 5
  }
}

function Home() {
  return (
    <main>
      <Pokemons />
    </main>
  )
}

export default Home;
