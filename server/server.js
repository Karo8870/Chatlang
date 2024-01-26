const { WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

server.listen(port, '0.0.0.0', () => {
	console.log(`WebSocket server is running on port ${port}`);
});

const clients = {};
const chatRooms = {};

wsServer.on('connection', function handleNewConnection(connection) {
	const userId = uuidv4();
	clients[userId] = connection;

	console.log(chatRooms, 222);

	connection.send(JSON.stringify({ type: 'chatRooms', data: Object.keys(chatRooms) }));

	connection.on('message', (message) => {
		handleMessage(userId, message);
	});

	connection.on('close', () => {
		handleClientDisconnection(userId);
	});
});

function handleMessage(userId, message) {
	try {
		const parsedMessage = JSON.parse(message);
		switch (parsedMessage.type) {
			case 'joinRoom':
				handleJoinRoom(userId, parsedMessage.data);
				break;
			case 'chatMessage':
				handleChatMessage(userId, parsedMessage.data);
				break;
			default:
				console.log('Unknown message type:', parsedMessage.type);
		}
	} catch (error) {
		console.error('Error parsing message:', error);
	}
}

function handleJoinRoom(userId, roomName) {
	console.log(roomName, 66);
	if (!chatRooms[roomName]) {
		chatRooms[roomName] = [];
	}

	chatRooms[roomName].push(userId);

	broadcastToRoom(roomName, { type: 'userJoined', userId });

	clients[userId].send(JSON.stringify({ type: 'roomJoined', data: roomName }));

	console.log(`${userId} joined room: ${roomName}`);
}

function handleChatMessage(userId, message) {
	const userRoom = findUserRoom(userId);
	if (userRoom) {
		broadcastToRoom(userRoom, { type: 'chatMessage', userId, message });
		console.log(`${userId} sent a message in room: ${userRoom}`);
	}
}

function handleClientDisconnection(userId) {
	const userRoom = findUserRoom(userId);

	if (userRoom) {
		const index = chatRooms[userRoom].indexOf(userId);
		if (index !== -1) {
			chatRooms[userRoom].splice(index, 1);
			broadcastToRoom(userRoom, { type: 'userLeft', userId });
			console.log(`${userId} left room: ${userRoom}`);
		}
	}

	delete clients[userId];
}

function broadcastToRoom(roomName, message) {
	if (chatRooms[roomName]) {
		chatRooms[roomName].forEach((userId) => {
			if (clients[userId]) {
				clients[userId].send(JSON.stringify(message));
			}
		});
	}
}

function findUserRoom(userId) {
	for (const roomName in chatRooms) {
		if (chatRooms[roomName].includes(userId)) {
			return roomName;
		}
	}
	return null;
}