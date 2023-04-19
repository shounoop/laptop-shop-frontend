import { Button, Title } from '@/src/components';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	data?: any;
}

const LaptopItem: React.FC<Props> = (props) => {
	const { data } = props;

	return (
		<Link href={'/product'}>
			<div className="w-full overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
				<img
					src="https://laptopworld.vn/media/product/9152_lenovo_ip_1_11igl05__7.jpg"
					// src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
					alt="laptop"
					className="h-[200px] w-full object-contain"
				/>

				<div className="h-[calc(100%-112px)] w-full">
					<Link href={'/product'}>
						<Title level={3} text="Mac Pro" />
					</Link>

					<Row align={'bottom'} justify={'space-between'} className="mt-[16px]">
						<Col>
							<Button type="primary" size="large" text="Mua ngay" />
						</Col>

						<Col>
							<Title level={4} className="text-primary" text={'35.999.999 VND'} />
						</Col>
					</Row>
				</div>
			</div>
		</Link>
	);
};

export default LaptopItem;
