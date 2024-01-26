import { Route, Routes } from 'react-router-dom';
import Chat from './chat/Chat';
import Login from './auth/Login';
import Home from './home/Home.tsx';
import AI from './ai/AI.tsx';

const App = () => {
	return (
		<div className={'bg-[#E0E7FF] w-screen h-screen p-10 overflow-hidden box-border'}>
			<h1 className={'text-4xl font-poppins font-semibold pb-3'}>ChatLang</h1>
			<div className={'flex bg-white w-full h-full rounded-large'}>
				<Home />
				<Chat />
				<AI />
			</div>
		</div>
	);
};

const s = () => {
	return (
		<Routes>
			<Route path='/chat/:roomID' element={<App />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
};

export default s;
