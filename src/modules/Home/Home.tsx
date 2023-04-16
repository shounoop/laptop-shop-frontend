import { useAppSelector } from '@/src/redux/hooks';
import { getIsAuthenticated } from '@/src/redux/slices/authSlice';
import { Row, Typography } from 'antd';
import LaptopItem from './components/LaptopItem/LaptopItem';
import { useEffect, useState } from 'react';
import mainAxios from '@/src/libs/main-axios';

const HomePage: React.FC = () => {
	const isAuthenticated = useAppSelector(getIsAuthenticated);

	const [laptops, setLaptops] = useState<any[]>();

	useEffect(() => {
		(async () => {
			try {
				const res = await mainAxios.get('http://localhost:3004/product');
				setLaptops(res.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div>
			{isAuthenticated && (
				<Row justify={'space-between'} align={'middle'}>
					<Typography.Title
						style={{
							padding: 10,
							borderRadius: 8,
							backgroundColor: `#ff7d03`,
						}}
						level={5}
					>
						{`Logged in`}
					</Typography.Title>
				</Row>
			)}

			{/* <LaptopItem /> */}
			{laptops && laptops?.map((item, index) => <LaptopItem data={item} key={index} />)}
		</div>
	);
};

export default HomePage;
