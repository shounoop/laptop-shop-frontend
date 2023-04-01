import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import HomePage from '../modules/Home';
import ThemeToggle from '@/src/comps/ThemeToggle';
import { useThemeContext } from '@/src/contexts/theme-context';
import { Row } from 'antd';

export default function Home() {
	const theme = useThemeContext();

	return (
		// <div className="bg-black h-screen overflow-hidden">
		<>
			<Head>
				<title>Laptop Shop</title>
				<meta
					name="description"
					content="Chào mừng bạn đến với cửa hàng laptop chuyên nghiệp của chúng tôi. Chúng tôi cung cấp một loạt các sản phẩm laptop chất lượng cao từ các thương hiệu hàng đầu thế giới như Apple, Dell, Lenovo, Asus và nhiều hãng khác. Khách hàng của chúng tôi sẽ tìm thấy một số lựa chọn tốt nhất về cấu hình, kích thước, màu sắc và giá cả. Chúng tôi cam kết cung cấp cho bạn các sản phẩm chất lượng, giá cả cạnh tranh và dịch vụ khách hàng tuyệt vời. Hãy truy cập vào trang web của chúng tôi để biết thêm chi tiết và đặt hàng ngay hôm nay!"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HomePage />

			<Row style={{ padding: 30, backgroundColor: `#e9e9e9` }}>
				<ThemeToggle />

				<div className="flex grow items-center justify-center text-6xl font-bold">
					{theme === 'dark' ? 'FaMoon' : 'FaSun'}
				</div>
			</Row>
		</>
	);
}
