import { Col, Row } from 'antd';
import Link from 'next/link';

interface Props {
	href: string;
	title?: string;
	isHome?: boolean;
}

const TabItem: React.FC<Props> = (props) => {
	const { href, title, isHome = false } = props;

	return (
		<Col>
			<Row>
				<Link
					href={href}
					className={
						isHome ? 'text-black font-bold text-2xl hover:text-primary pr-6' : 'px-7 py-1 font-medium text-black text-base hover:text-primary'
					}
				>
					{title}
				</Link>
			</Row>
		</Col>
	);
};

export default TabItem;
