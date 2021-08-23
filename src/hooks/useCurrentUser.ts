import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
// import jwt from 'jsonwebtoken';

import useAPI from 'hooks/useAPI';

function useCurrentUser() {
	const [cookies, setCookie] = useCookies();

	// eslint-disable-next-line
	const [API] = useCallback(useAPI(), [cookies]);
	let { id_token: accessToken = '' } = API.cookie.get();

	// const decodeIdToken = jwt.decode(accessToken) as { [key: string]: any };

	const getCurrentUser = useCallback(async () => {
		try {
			const token = await API.session.get();
			const idToken = token.signInUserSession?.idToken?.jwtToken;
			setCookie('id_token', idToken, { path: '/' });
			return idToken;
		} catch (error) {
			if (error === null) {
				await API.session.delete();
			}
			throw error;
		}
		// eslint-disable-next-line
	}, [accessToken]);

	const deleteSession = useCallback(async () => {
		try {
			await API.session.delete();
		} finally {
			window.location.href = '/login';
		}
	}, [API.session]);

	return {
		// name: decodeIdToken ? decodeIdToken['name'] : '',
		accessToken,
		getCurrentUser,
		deleteSession,
	};
}

export default useCurrentUser;
