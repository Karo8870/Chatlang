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

	return (
		<CreateContext.Provider
			value={{
				text,
				setText
			}}
		>
			{children}
		</CreateContext.Provider>
	);
};
