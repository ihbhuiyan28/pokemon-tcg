import { FooterLayout } from '@/components/Footer';
import { NavbarLayout } from '@/components/Navbar';
import '@/styles/globals.css'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <NavbarLayout />
        <Component {...pageProps} />
        <FooterLayout />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
