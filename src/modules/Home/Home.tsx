import { useEffect, useState } from 'react';
import mainAxios from '@/src/libs/main-axios';
import { Button, Title } from '@/src/components';
import { Col, Input, Row, Select, SelectProps } from 'antd';
import LaptopItem from './components/LaptopItem';

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

	// functions
	const handleChange = () => {};

	const options: SelectProps['options'] = [];

	for (let i = 10; i < 36; i++) {
		options.push({
			value: i.toString(36) + i,
			label: i.toString(36) + i,
		});
	}

	return (
		<div>
			<Row justify={'space-between'} align={'middle'} className="my-4">
				<Col>
					<Title level={4} text="Tất cả sản phẩm" />
				</Col>

				<Col>
					<Row gutter={16} wrap={false}>
						<Col>
							<Input className="min-w-[300px] border-0 p-2" placeholder="Nhập tên sản phẩm..." />
						</Col>

						<Col>
							<Button type="primary" className="h-full" text="Tìm kiếm" />
						</Col>
					</Row>
				</Col>
			</Row>

			<Row gutter={16} justify={'end'} className="mb-4">
				<Col>
					<Select
						size={'middle'}
						defaultValue="Tất cả"
						onChange={handleChange}
						style={{ width: 300 }}
						options={options}
					/>
				</Col>

				<Col>
					<Button type='primary' className='min-w-[90.08px]' text="Lọc" />
				</Col>
			</Row>

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
