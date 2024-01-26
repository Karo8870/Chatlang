import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WS_URL = 'ws://localhost:8000';

const Chat = () => {
	const [messages, setMessages] = useState<any[]>([]);
	const [text, setText] = useState<string>('');

	let { roomID } = useParams();

	const { sendJsonMessage } = useWebSocket(WS_URL, {
		onMessage(message) {
			const data = JSON.parse(message.data);

			switch (data.type) {
				case 'chatMessage':
					setMessages([...messages, data.message]);
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
				date: new Date()
			}
		});
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column'
				}}
			>
				{messages.map((message, index) => (
					<label key={index}>
						{message.body} - {message.date}
					</label>
				))}
			</div>
			<div>
				<input
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					placeholder='message'
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</div>
	);
};

export default Chat;
