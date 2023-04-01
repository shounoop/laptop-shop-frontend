import mainAxios from '@/src/libs/main-axios';
import PATH from '@/src/shared/path';
import { Button, Col, Input, Menu, Modal, Row } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
	children?: React.ReactNode;
}

const MainLayout: React.FC<Props> = (props) => {
	const { children } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleLogin = () => {
		(async () => {
			const res = await mainAxios.post(`users/login`, { username, password });

			console.log('res', res)
		})();
	};

	return (
		<div style={{ backgroundColor: `#fff` }}>
			<Row align={'middle'} gutter={8} style={{ padding: 10 }}>
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

				<Col>
					<Row
						justify={'center'}
						style={{
							// backgroundColor: `#000`,
							// color: `#fff`,
							padding: `6px 16px`,
						}}
					>
						<Button onClick={showModal}>Login</Button>
					</Row>
				</Col>
			</Row>

			{children}

			<Modal title="Login" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<Input
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button onClick={handleLogin}>Login</Button>
			</Modal>
		</div>
	);
};

export default MainLayout;
