import { useCallback } from 'react';

import { Storage } from '../helpers/storage';

import { useProfileContext } from '../context/ProfileContext';
import { useToken } from '../context/TokenContextProvider';

import { TOKEN_STORAGE_KEY } from '../constants/storage-keys';

export function useLogout() {
	const [_, setToken] = useToken();

	const [__, setProfile] = useProfileContext();

	const logout = useCallback(() => {
		setToken(null);

		setProfile(null);
		Storage.delete(TOKEN_STORAGE_KEY);
	}, [setToken]);

	return logout;
}
