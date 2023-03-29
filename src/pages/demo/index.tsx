import { Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import mainAxios from '../../libs/main-axios';

const Demo = () => {
	const [res, setRes] = useState<any>();

	useEffect(() => {
		(async () => {
			try {
				const resHere = await mainAxios.get(`http://localhost:3000/api/hello`);

				if (resHere) {
					setRes(resHere);
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const apiKey = `19690f4216d74fac8cefb59b6db3a639`;
	const type = `tesla`;
	const date = `2022-12-17`;
	const sortBy = `publishedAt`;
	const url = `https://newsapi.org/v2/everything?q=${type}&from${date}&sortBy=${sortBy}&apiKey=${apiKey}`;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(url);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div>
			<h1
				style={{
					textAlign: `center`,
					fontSize: 40,
					fontWeight: 900,
				}}
			>
				DEMO
			</h1>

			<ul>
				<li>this is a li tag</li>
			</ul>

			<Input placeholder="this is a input" style={{ width: `auto` }} />
		</div>
	);
};

export default Demo;
