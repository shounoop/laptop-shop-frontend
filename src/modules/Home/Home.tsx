import LaptopItem from './components/LaptopItem/LaptopItem';
import { useEffect, useState } from 'react';
import mainAxios from '@/src/libs/main-axios';
import { Title } from '@/src/components';
import { Col, Row } from 'antd';

const HomePage: React.FC = () => {
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
			<Title level={4} text="Tất cả sản phẩm"/>

			<Row gutter={[24, 24]}>
				<Col span={8}>
					<LaptopItem />
				</Col>

				<Col span={8}>
					<LaptopItem />
				</Col>
				<Col span={8}>
					<LaptopItem />
				</Col>
				<Col span={8}>
					<LaptopItem />
				</Col>
			</Row>

			{laptops && laptops?.map((item, index) => <LaptopItem data={item} key={index} />)}
		</div>
	);
};

export default HomePage;
