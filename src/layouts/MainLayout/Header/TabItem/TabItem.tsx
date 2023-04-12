import color from '@/src/styles/color';
import { fontSize, fontWeight, lineHeight } from '@/src/styles/typography';
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
					style={
						{
							// color: color.primary,
							// fontWeight: isHome ? fontWeight.lv3 : fontWeight.lv6,
							// fontSize: isHome ? `27px` : `16px`,
							// lineHeight: isHome ? `33px` : `20px`,
							// padding: isHome ? `0` : `8px 30px`,
						}
					}
					className={
						isHome ? 'text-black font-bold text-2xl' : 'px-7 py-1 text-black text-base font-normal'
					}
				>
					{title}
				</Link>
			</Row>
		</Col>
	);
};

export default TabItem;
