import { Route, Routes } from 'react-router-dom';
import Chat from './chat/Chat';
import Login from './auth/Login';
import Home from './home/Home.tsx';

const App = () => {
	return (
		<div className={'flex'}>
			<Home />
			<Chat />
		</div>
	);
};

const s = () => {
	return (
		<Routes>
			<Route path="/chat/:roomID" element={<App />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default s
