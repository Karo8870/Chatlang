import OpenAI from 'openai';
import { useContext } from 'react';
import { CreateContext } from '../context.tsx';

const openai = new OpenAI({
	apiKey: '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',
	dangerouslyAllowBrowser: true
});

export default function AI() {
	const { text, setText } = useContext(CreateContext)!;

	return (
		<div className={'w-2/5 mt-7 ml-7 pr-10'}>
			<h1 className={'font-poppins font-semibold text-2xl'}>AI features</h1>
			<div className={'flex flex-col'}>
				<button
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content:
										'You are a virtual assistant that should rewrite the written message, making it more professional, using formal language whilst reaching the same intentions.'
								},
								{
									role: 'user',
									content: text
								}
							],
							model: 'gpt-3.5-turbo'
						});

						setText(newText.choices[0].message.content!);
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
				>
					Convert to formal text
				</button>
				<button
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content:
										'You are a virtual assistant that should explain what the message received meant, or what some words or typos mean. This should be done shortly so that the user can understand fast and easily.'
								},
								{
									role: 'user',
									content: text
								}
							],
							model: 'gpt-3.5-turbo'
						});

						setText(newText.choices[0].message.content!);
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
				>
					Explain more
				</button>
				<button
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content:
										'You are a virtual assistant that should create a shorter version of the previous message received, whilst keeping the most relevant portions of the message'
								},
								{
									role: 'user',
									content: text
								}
							],
							model: 'gpt-3.5-turbo'
						});

						setText(newText.choices[0].message.content!);
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
				>
					Summarize
				</button>
				<textarea>test</textarea>
				<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'>
					Generate response
				</button>
			</div>
		</div>
	);
}
