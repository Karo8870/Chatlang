import aes256 from 'aes256';

const key = 'obvwoqcbv21801f19d0zibcoavwpnq';

export const DoEncrypt = (text: string) => {
	return aes256.encrypt(key, text);
};
export const DoDecrypt = (cipher: string, username: string) => {
	if (cipher.startsWith('Welcome')) {
		return cipher;
	}

	if (cipher.startsWith(username)) {
		return cipher;
	}

	return aes256.decrypt(key, cipher);
};
