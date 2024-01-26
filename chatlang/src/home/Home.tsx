import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WS_URL = 'ws://localhost:8000';

const Home = () => {
	const [rooms, setRooms] = useState<string[]>([]);

	useWebSocket(WS_URL, {
		onMessage(message) {
			const data = JSON.parse(message.data);

			switch (data.type) {
				case 'chatRooms':
					console.log(data.data);
					setRooms([...data.data]);
			}
			console.log(message);
		},
		onOpen() {
			console.log('Connected');
		}
	});

	return (
		<div>
			<div>
				{rooms.map((room, index) => (
					<Link to={`/chat/${room}`} key={index}>
						<label>{room}</label>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
