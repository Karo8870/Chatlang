import { Route, Routes } from 'react-router-dom';
import Home from './home/Home.tsx';
import Chat from './chat/Chat.tsx';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/chat/:roomID' element={<Chat />} />
		</Routes>
	);
};

export default App;
