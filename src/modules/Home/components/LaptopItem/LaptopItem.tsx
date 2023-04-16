import { Button, Col, Row, Typography } from 'antd';
import Image from 'next/image';

interface Props {
	data?: any;
}

const LaptopItem: React.FC<Props> = (props) => {
	const { data } = props;

	return (
		<div className="w-80 rounded-2xl overflow-hidden bg-black">
			<img
				// src='https://laptopworld.vn/media/product/9152_lenovo_ip_1_11igl05__7.jpg'
				src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
				alt="Girl in a jacket"
				className="object-cover w-full h-29"
			/>

			<div className="w-full h-[calc(100%-112px)] p-4">
				<h2 className="text-white">{data?.productName || 'Mac Pro'}</h2>

				<Row align={'middle'} justify={'space-between'}>
					<Col>
						<button className="bg-green-500 text-white rounded-md px-4 py-2">Book Now</button>
					</Col>

					<Col>
						<p className="text-gray-100 text-sm">5$</p>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default LaptopItem;
