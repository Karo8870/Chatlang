import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyC8h49D2rfy92n6LEKGr3IXYl9a4ugmZQk',
	authDomain: 'chatlang-bd63e.firebaseapp.com',
	projectId: 'chatlang-bd63e',
	storageBucket: 'chatlang-bd63e.appspot.com',
	messagingSenderId: '400626109690',
	appId: '1:400626109690:web:078a7fdbf0e69ab6798d43',
	measurementId: 'G-YCTB2NSDPE'
};

export const app = initializeApp(firebaseConfig);
