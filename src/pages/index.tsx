import { Button } from 'antd';
import HomePage from '../modules/Home';
import Head from 'next/head';

export default function Home() {
	// const theme = useThemeContext();

	return (
		<>
			<Head>
				<title>Laptop Shop</title>
				<meta
					name="description"
					content="Welcome to our professional laptop store. We offer a range of high-quality laptop products from top brands around the world such as Apple, Dell, Lenovo, Asus, and many others. Our customers will find the best options for configuration, size, color, and price. We are committed to providing you with quality products, competitive prices, and excellent customer service. Visit our website for more details and place your order today!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <HomePage /> */}

			{/* <div>
				<h1 className="text-3xl font-bold underline">Hello world!</h1>

				<Button size="large" type="primary">
					Button
				</Button>

				<Button size="large" type="primary" className="bg-primary border-primary">
					Button
				</Button>
			</div> */}

			{/* <Row style={{ padding: 30, backgroundColor: `#e9e9e9` }}>
				<ThemeToggle />

				<div className="flex grow items-center justify-center text-6xl font-bold">
					{theme === 'dark' ? 'FaMoon' : 'FaSun'}
				</div>
			</Row> */}
		</>
	);
}
