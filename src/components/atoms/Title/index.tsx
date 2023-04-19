import React from 'react';
import { Typography } from 'antd';
import { Props } from './title.props';

const { Title: AntdTitle } = Typography;

const Title: React.FC<Props> = (props) => {
	const { level = 1, text, className } = props;

	return (
		<AntdTitle level={level} className={`m-0 ${className}`}>
			{text}
		</AntdTitle>
	);
};

export default Title;
