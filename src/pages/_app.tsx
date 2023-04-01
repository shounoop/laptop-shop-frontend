import '@/src/styles/globals.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { ThemeContextProvider } from '../contexts/theme-context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeContextProvider>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</ThemeContextProvider>
	);
}
