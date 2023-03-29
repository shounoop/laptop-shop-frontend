interface Props {
	children?: React.ReactNode;
}

const BlogLayout: React.FC<Props> = (props) => {
	const { children } = props;

	return <>{children}</>;
};

export default BlogLayout;
