import useWebSocket from 'react-use-websocket';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateContext } from '../context.tsx';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase.ts';

const WS_URL = 'ws://localhost:8000';

const Chat = () => {
	const { text, setText, messages, setMessages } = useContext(CreateContext)!;

	const [user, setUser] = useState<string>('');

	let { roomID } = useParams();

	const { sendJsonMessage } = useWebSocket(WS_URL, {
		onMessage(message) {
			const data = JSON.parse(message.data);

			console.log(data, 555);

			switch (data.type) {
				case 'chatMessage':
					console.log(data, 333);
					setMessages([
						...messages,
						{ body: JSON.stringify(data.message), room: roomID }
					]);
					break;

				case 'chatRooms':
					console.log(data, 'lll');

					setMessages([...data.data.messages]);
			}

			console.log(message, data);
		},
		onOpen() {
			console.log('Connected');
		}
	});

	useEffect(() => {
		sendJsonMessage({ type: 'joinRoom', data: roomID });
	}, []);

	const sendMessage = () => {
		sendJsonMessage({
			type: 'chatMessage',
			data: {
				body: text,
				date: new Date(),
				sender: user
			}
		});
	};

	const auth = getAuth(app);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			setUser(user?.email!);
		});
	}, []);

	return (
		<div
			className={
				'bg-[#161932] mx-5 w-full flex flex-col justify-between h-full rounded-large'
			}
		>
			<div className={'overflow-auto p-5 space-y-4'}>
				{messages
					.filter((msg: any) => msg.room === roomID)
					.map((message: any, index: number) => (
						<div key={index} className={`${JSON.parse(message.body).sender === user ? 'bg-white' : 'bg-blue-300'} rounded-md p-3`}>
							<p>{JSON.parse(message.body).body}</p>
							<p>{new Date(JSON.parse(message.body).date).toLocaleString()}</p>
						</div>
					))}
			</div>
			<div className={'p-5 flex pb-10'}>
				<input
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					placeholder='Write your message here...'
					className={'border rounded-full p-2 flex-grow'}
				/>
				<button
					onClick={sendMessage}
					className={'bg-blue-500 text-white rounded-lg p-2 ml-2 w-20'}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
