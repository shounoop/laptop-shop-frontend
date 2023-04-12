import Header from './Header';

interface Props {
	children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<>
			<div style={{ backgroundColor: `#fefefe` }}>
				<Header />

				{children}
			</div>
		</>
	);
};

export default MainLayout;
