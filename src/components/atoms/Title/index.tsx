import React from 'react';
import { Typography } from 'antd';
import { Props } from './title.props';

const { Title: AntdTitle } = Typography;

const Title: React.FC<Props> = ({ level = 1, text }) => {
	return <AntdTitle level={level}>{text}</AntdTitle>;
};

export default Title;
