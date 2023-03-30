import PATH from '@/src/shared/path';
import { Col, Menu, Row } from 'antd';
import Link from 'next/link';

interface Props {
	children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<div style={{backgroundColor: `#fff`}}>
			<Row gutter={8} style={{ padding: 10 }}>
				<Col>
					<Row
						justify={'center'}
						style={{ backgroundColor: `#000`, color: `#fff`, padding: `6px 16px` }}
					>
						<Link href={PATH.HOME}>HOME</Link>
					</Row>
				</Col>

				<Col>
					<Row
						justify={'center'}
						style={{ backgroundColor: `#000`, color: `#fff`, padding: `6px 16px` }}
					>
						<Link href={PATH.DEMO}>DEMO</Link>
					</Row>
				</Col>

				<Col>
					<Row
						justify={'center'}
						style={{ backgroundColor: `#000`, color: `#fff`, padding: `6px 16px` }}
					>
						<Link href={PATH.PAYMENT}>PAYMENT</Link>
					</Row>
				</Col>
			</Row>

			{children}
		</div>
	);
};

export default MainLayout;
