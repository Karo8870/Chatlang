import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState
} from 'react';

interface CreateContextModel {
	text: string;
	setText: Dispatch<SetStateAction<string>>;
	messages: any;
	setMessages: Dispatch<any>;
}

export const CreateContext = createContext<CreateContextModel | undefined>(
	undefined
);

export const CreateContextProvider = ({
	children
}: {
	children: ReactNode;
}) => {
	const [text, setText] = useState<string>('');
	const [messages, setMessages] = useState<any>([]);

	return (
		<CreateContext.Provider
			value={{
				text,
				setText,
				messages,
				setMessages
			}}
		>
			{children}
		</CreateContext.Provider>
	);
};
