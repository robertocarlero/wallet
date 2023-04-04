import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { setToken } from '../helpers/token-helper';

import { SCREENS } from '../constants/screens';

const TokenContext = React.createContext([{}, () => {}]);

export const useToken = () => {
	return useContext(TokenContext);
};

export function TokenContextProvider({ children }) {
	const [value, setValue] = useState('');
	const navigation = useNavigation();

	useEffect(() => {
		setToken(value);

		if (!value) {
			navigation.navigate(SCREENS.WELCOME.name);
		}

		if (value) {
			navigation.navigate(SCREENS.HOME.name);
		}
	}, [value]);

	return <TokenContext.Provider value={[value, setValue]}>{children}</TokenContext.Provider>;
}
