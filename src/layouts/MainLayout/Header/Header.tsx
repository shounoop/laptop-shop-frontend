import PATH from '@/src/shared/path';
import { Button as AntdBtn, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import TabItem from './TabItem/TabItem';
import { deleteCookie, getCookie } from '@/src/utils/cookie';
import LOCAL_STORAGE_KEY from '@/src/shared/local-storage-key';
import { isAuthenticatedJwt } from '@/src/utils/jwt';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getIsAuthenticated, setIsAuthenticated } from '@/src/redux/slices/authSlice';
import { Button, LoginModal } from '@/src/components';

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
			<Row
				justify={'space-between'}
				align={'middle'}
				className="fixed top-0 z-[1] w-screen border-b-[1px] border-solid border-b-slate-200 bg-zinc-300 px-[120px] py-[42px]"
			>
				<Col className="ml-[-30px]">
					<Row align={'middle'}>
						<TabItem href={PATH.HOME} title="LAPTOP SHOP" isHome />
						<TabItem href={PATH.PAYMENT} title="PAYMENT" />
						<TabItem href={PATH.GET_USER_BY_ID} title="GET-USER" />
						<TabItem href={PATH.DEMO_COMPS} title="DEMO-COMPS" />
					</Row>
				</Col>

				{!isAuthenticated && (
					<Col className="mr-[-30px]">
						<Row justify={'center'} gutter={16}>
							<Col>
								<Button type="primary" text="Đăng nhập" onClick={showLoginModal} />
							</Col>

							<Col>
								<Button text="Đăng ký" />
							</Col>
						</Row>
					</Col>
				)}

				{isAuthenticated && (
					<Col className="mr-[-30px]">
						<Row justify={'center'}>
							<AntdBtn onClick={handleLogout}>LOG OUT</AntdBtn>
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
