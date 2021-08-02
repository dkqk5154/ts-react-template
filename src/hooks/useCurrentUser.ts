import { useContext, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

import useAPI from 'hooks/useAPI';

import { CurrentUserContext } from 'contexts/CurrentUserContext';

function useCurrentUser() {
	const [cookies, setCookie] = useCookies();

	const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

	// eslint-disable-next-line
	const [API] = useCallback(useAPI(), [cookies]);
	let { idToken: accessToken = '' } = cookies

	const decodeIdToken = jwt.decode(accessToken) as { [key: string]: any };


	const getCurrentUser = useCallback(async () => {
		try {
			const token = await API.session.get();
			const idToken = token.signInUserSession?.idToken?.jwtToken;
			setCurrentUser(idToken);
			setCookie('id_token', idToken, { path: '/' });
			return idToken;
		} catch (error) {
			if (error === null) {
				setCurrentUser(null);
				await API.session.delete();
			}
			throw error;
		}
		// eslint-disable-next-line
	}, [accessToken, setCurrentUser]);

	const deleteSession = useCallback(async () => {
		try {
			await API.session.delete();
		} finally {
			window.location.href = '/login';
		}
	}, [API.session]);

	

	return {
		name: decodeIdToken ? decodeIdToken['name'] : '',
		currentUser,
		accessToken,
		getCurrentUser,
		deleteSession,
	};
}

export default useCurrentUser;
