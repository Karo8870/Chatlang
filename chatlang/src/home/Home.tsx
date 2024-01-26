import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WS_URL = 'ws://localhost:8000';

const Home = () => {
	const [rooms, setRooms] = useState<string[]>([]);
	const location = useLocation();
	console.log('locationnnnn');
	console.log(location);

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
		<div className={'w-1/4 mt-7 ml-7'}>
			<div>
				{rooms.map((room, index) => (
					<Link to={`/chat/${room}`} key={index}>
						<div className="flex px-10 py-5 rounded-md cursor-pointer hover:bg-gray-200"
								 style={location.pathname.split('/').reverse()[0] === room ? {
									 background: '#161932',
									 color: 'white'
								 } : {}}>
							<label className={'font-semibold text-xl'}>{room}</label>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
