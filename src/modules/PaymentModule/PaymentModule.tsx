import mainAxios from '@/src/libs/main-axios';
import { Button, Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const PaymentModule: React.FC = () => {
	const [id, setId] = useState('');
	const [creditCards, setCreditCards] = useState<any[]>();
	const [currentCreditCard, setCurrentCreditCard] = useState<any>();

	useEffect(() => {
		(async () => {
			try {
				const res: any = await mainAxios.get(`/credit-cards`);

				setCreditCards(res);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	// const handleSearch = () => {
	// 	let creditCard;

	// 	creditCards?.map((item) => {
	// 		if (item?.id === id) {
	// 			creditCard = item;
	// 		}
	// 	});

	// 	if (creditCard) {
	// 		setCurrentCreditCard(creditCard);
	// 	}
	// };

	const handleSearch = async () => {
		try {
			const res = await mainAxios.get(`/credit-cards/${id}`);

			if (res) {
				setCurrentCreditCard(res);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handlePay = async () => {
		try {
			const res = await mainAxios.put(`/credit-cards/${id}`);

			setCurrentCreditCard(res);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Row justify={'center'} align={'middle'}>
			<Col>
				<Row justify={'center'}>
					<Col>
						<Row gutter={8}>
							<Col>
								<Input
									value={id}
									placeholder="Card number..."
									onChange={(e) => setId(e.target.value)}
								/>
							</Col>

							<Col>
								<Button type="primary" onClick={handleSearch}>
									Search
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row gutter={[10, 20]} style={{ marginTop: 24 }}>
					{creditCards &&
						!currentCreditCard &&
						creditCards?.map((item, index) => (
							<Col span={8} key={index}>
								<div
									style={{
										borderRadius: 8,
										backgroundColor: `#006cec19`,
										padding: 24,
									}}
								>
									<Row justify={'space-between'}>
										<Col>
											<Typography.Title
												style={{ margin: 0, paddingBottom: 16 }}
												level={5}
											>{`Username: user1`}</Typography.Title>
										</Col>

										<Col>
											<Typography.Title style={{ margin: 0, paddingBottom: 16 }} level={5}>
												visa
											</Typography.Title>
										</Col>
									</Row>

									<Row>
										<Typography.Title
											style={{ margin: 0, paddingBottom: 16 }}
											level={5}
										>{`CVC: 9e4bc428-c4f1-4e3c-8e7a-4f56fb5519c4`}</Typography.Title>
									</Row>

									<Row>
										<Typography.Title
											style={{ margin: 0, paddingBottom: 16 }}
											level={5}
										>{`Expiration date: 2023-04-02T17:41:43.000Z`}</Typography.Title>
									</Row>

									<Button type="primary" style={{ width: `100%` }}>
										Pay Now
									</Button>
								</div>
							</Col>
						))}

					{currentCreditCard && (
						<div
							style={{
								borderRadius: 8,
								backgroundColor: `#006cec19`,
								padding: 24,
							}}
						>
							<Row justify={'space-between'}>
								<Col>
									<Typography.Title
										style={{ margin: 0, paddingBottom: 16 }}
										level={5}
									>{`Username: ${currentCreditCard?.username}`}</Typography.Title>
								</Col>

								<Col>
									<Typography.Title style={{ margin: 0, paddingBottom: 16 }} level={5}>
										{`${currentCreditCard?.type}`}
									</Typography.Title>
								</Col>
							</Row>

							<Row>
								<Typography.Title
									style={{ margin: 0, paddingBottom: 16 }}
									level={5}
								>{`CVC: ${currentCreditCard?.cvc}`}</Typography.Title>
							</Row>

							<Row>
								<Typography.Title
									style={{
										margin: 0,
										paddingBottom: 16,
									}}
									level={5}
								>{`Expiration date: ${currentCreditCard?.expirationDate.substring(
									0,
									10
								)}`}</Typography.Title>
							</Row>

							<Row>
								<Typography.Title
									style={{
										margin: 0,
										paddingBottom: 16,
										color: (currentCreditCard?.isPaid && 'green') || 'red',
									}}
									level={5}
								>{`Status: ${(currentCreditCard?.isPaid && `paid`) || `unpaid`}`}</Typography.Title>
							</Row>

							{currentCreditCard?.isPaid === false && (
								<Button type="primary" style={{ width: `100%` }} onClick={handlePay}>
									Pay Now
								</Button>
							)}
						</div>
					)}
				</Row>
			</Col>
			{/* <Row align={'middle'} justify={'center'} style={{height: `calc(100vh - 53px)`}}>
				<Button>DONE</Button>
			</Row> */}
		</Row>
	);
};

export default PaymentModule;
