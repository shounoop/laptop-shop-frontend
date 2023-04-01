import mainAxios from '@/src/libs/main-axios';
import { useEffect } from 'react';

const PricingPage = () => {
	useEffect(() => {
		(async () => {
			try {
				const res = await mainAxios.get(`/credit-cards`);
				console.log('res', res);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return <div></div>;
};

export default PricingPage;
