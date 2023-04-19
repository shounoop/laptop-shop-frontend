import { Button, Title } from '@/src/components';
import { Col, Row } from 'antd';
import Reputation from './Reputation/Reputation';

const ProductModule: React.FC = () => {
	return (
		<div className="rounded bg-white p-4">
			<div className="border-b border-solid border-gray-400 pb-4">
				<Title
					level={3}
					text={`[Mới 100%] Dell Gaming G15 5525 (Ryzen 5-6600H, 8GB, 512GB, RTX 3050 4GB, 15.6'' FHD 120Hz)`}
				/>
			</div>

			<Row gutter={24} className="mt-6">
				<Col span={6}>
					<img
						src="https://laptopworld.vn/media/product/9152_lenovo_ip_1_11igl05__7.jpg"
						// src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
						alt="laptop"
						className="h-[200px] w-full object-contain"
					/>
				</Col>

				<Col span={9}>
					<div>
						<Title className="text-primary" text={`Deal: 19.890.000`} />
					</div>

					<Row className='mt-2'>
						<Col>
							<Title level={5} text={`Bảo hành:`} />
						</Col>

						<Col className="ml-1">
							<Title level={5} className="font-normal" text={`12 tháng LaptopAZ`} />
						</Col>
					</Row>
					
					<Row className='mt-2'>
						<Col>
							<Title level={5} text={`Tình trạng:`} />
						</Col>

						<Col className="ml-1">
							<Title level={5} className="font-normal" text={`còn hàng`} />
						</Col>
					</Row>

					<Button text='Mua ngay' size='large' className='mt-4 min-w-[150px]'/>
				</Col>

				<Reputation />
			</Row>
		</div>
	);
};

export default ProductModule;
