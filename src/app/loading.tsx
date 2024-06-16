const Loading = () => {
	return (
		<div className="flex items-center justify-center bg-gray-200 bg-opacity-50 min-h-[calc(100vh-64px)]">
			<div className="animate-spin h-12 w-12 border-t-4 border-pink-600 rounded-full" />
		</div>
	);
};

export default Loading;
