import PATH from '@/src/shared/path';
import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import TabItem from './TabItem/TabItem';
import { deleteCookie, getCookie } from '@/src/utils/cookie';
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key';
import { isAuthenticatedJwt } from '@/src/utils/jwt';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getIsAuthenticated, setIsAuthenticated } from '@/src/redux/slices/authSlice';
import { LoginModal } from '@/src/components';

const Header: React.FC = () => {
	// store
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(getIsAuthenticated);

	// useState
	const [isVisibleLoginModal, setIsVisibleLoginModal] = useState(false);

	// functions
	const showLoginModal = () => {
		setIsVisibleLoginModal(true);
	};

	const handleLogout = () => {
		deleteCookie(LOCAL_STORAGE_KEY.TOKEN);
		window.location.reload();
	};

	// useEffect
	useEffect(() => {
		const token = getCookie(LOCAL_STORAGE_KEY.TOKEN);

		if (token && isAuthenticatedJwt(token)) {
			dispatch(setIsAuthenticated(true));
		} else {
			dispatch(setIsAuthenticated(false));
		}
	}, []);

	return (
		<>
			<Row justify={'space-between'} align={'middle'} style={{ padding: `42px 120px` }}>
				<Col style={{ marginLeft: -30 }}>
					<Row align={'middle'}>
						<TabItem href={PATH.HOME} title="LAPTOP SHOP" isHome />
						<TabItem href={PATH.PAYMENT} title="PAYMENT" />
						<TabItem href={PATH.GET_USER_BY_ID} title="GET-USER" />
						<TabItem href={PATH.DEMO_COMPS} title="DEMO-COMPS" />
					</Row>
				</Col>

				{!isAuthenticated && (
					<Col>
						<Row justify={'center'} gutter={16}>
							<Col>
								<Button type="primary" onClick={showLoginModal}>
									LOG IN
								</Button>
							</Col>

							<Col>
								<Button type="default">SIGN UP</Button>
							</Col>
						</Row>
					</Col>
				)}

				{isAuthenticated && (
					<Col>
						<Row justify={'center'}>
							<Button onClick={handleLogout}>LOG OUT</Button>
						</Row>
					</Col>
				)}
			</Row>

			{/* portal elements */}
			<>
				{isVisibleLoginModal && (
					<LoginModal visible={isVisibleLoginModal} setVisible={setIsVisibleLoginModal} />
				)}
			</>
		</>
	);
};

export default Header;
