export default function AI() {
	return (
		<div className={'w-2/5 mt-7 ml-7 pr-10'}>
			<h1 className={'font-poppins font-semibold text-2xl'}>AI features</h1>
			<div className={'flex flex-col'}>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
					Summarize
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
					Expand
				</button>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
					Convert to formal text
				</button>
			</div>
		</div>
	);
}