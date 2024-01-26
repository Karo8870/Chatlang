import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Chat from './chat/Chat';
import Login from './auth/Login';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/chat/:roomID' element={<Chat />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

export default App;
