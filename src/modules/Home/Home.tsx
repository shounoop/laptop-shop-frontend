import { useAppSelector } from '@/src/redux/hooks';
import { getIsAuthenticated } from '@/src/redux/slices/authSlice';
import { Row, Typography } from 'antd';

const HomePage: React.FC = () => {
	const isAuthenticated = useAppSelector(getIsAuthenticated);

	return (
		<div>
			{isAuthenticated && (
				<Row justify={'space-between'} align={'middle'}>
					<Typography.Title
						style={{
							padding: 10,
							borderRadius: 8,
							backgroundColor: `#ff7d03`,
						}}
						level={5}
					>
						{`Logged in`}
					</Typography.Title>
				</Row>
			)}
		</div>
	);
};

export default HomePage;
