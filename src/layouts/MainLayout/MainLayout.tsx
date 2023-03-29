import { Menu } from 'antd';

interface Props {
	children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<>
			<h1>Menu</h1>
			{children}
		</>
	);
};

export default MainLayout;
