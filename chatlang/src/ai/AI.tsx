import OpenAI from 'openai';
import { useContext, useEffect, useState } from 'react';
import { CreateContext } from '../context.tsx';
import { useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase.ts';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

const openai = new OpenAI({
	apiKey: 'your-key-here',
	dangerouslyAllowBrowser: true
});

export default function AI() {
	const { text, setText, messages, setMessages } = useContext(CreateContext)!;

	let { roomID } = useParams();

	const auth = getAuth(app);

	const [user, setUser] = useState<string>('');
	const [language, setLanguage] = useState<string>('');

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user?.email!);
		});
	}, []);

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
				<button
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content:
										'You are a virtual assistant that should write the best reply to a message based on the last few messages exchanged. Generate 3 different responses, with different meanings or intentions.'
								},
								{
									role: 'user',
									content: JSON.parse(
										messages
											.filter(
												(msg: any) =>
													msg.room === roomID &&
													JSON.parse(msg.body).sender !== user
											)
											.at(-1).body
									).body
								}
							],
							model: 'gpt-3.5-turbo'
						});

						setText(newText.choices[0].message.content!);
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
				>
					Generate response
				</button>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content: `You are a virtual assistant that should translate text to the specific language: ${language}.`
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
				>
					Translate message to...
				</button>
				<button
					onClick={async () => {
						const newText = await openai.chat.completions.create({
							messages: [
								{
									role: 'system',
									content: `You are a virtual assistant that should translate text to the specific language: ${language}.`
								},
								{
									role: 'user',
									content: JSON.parse(
										messages
											.filter(
												(msg: any) =>
													msg.room === roomID &&
													JSON.parse(msg.body).sender !== user
											)
											.at(-1).body
									).body
								}
							],
							model: 'gpt-3.5-turbo'
						});

						messages
							.filter(
								(msg: any) =>
									msg.room === roomID && JSON.parse(msg.body).sender !== user
							)
							.at(-1).body = JSON.stringify({
							body: newText,
							date: JSON.parse(
								messages
									.filter(
										(msg: any) =>
											msg.room === roomID &&
											JSON.parse(msg.body).sender !== user
									)
									.at(-1).body
							).date
						});

						setMessages(JSON.parse(JSON.stringify(messages)));
					}}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2'
				>
					Translate message from...
				</button>
				<input
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
					placeholder={'language'}
				/>
				<h1>Encoded:</h1>
				<p>
					{Base64.stringify(
						sha256(
							messages.filter((msg: any) => msg.room === roomID)?.at(-1)
								?.body || ''
						)
					)}
					{JSON.stringify(
						messages.filter((msg: any) => msg.room === roomID)?.at(-1)?.body ||
							''
					)}
				</p>
			</div>
		</div>
	);
}
