import '@/src/styles/style.scss';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { ThemeContextProvider } from '../contexts/theme-context';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ThemeContextProvider>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ThemeContextProvider>
		</Provider>
	);
}
