import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CurrentUserContext = createContext<any | null>(null);

const CurrentUserProvider = ({ children }: any) => {
	const [currentUser, setCurrentUser] = useState(null);
	return (
		<CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
			{children}
		</CurrentUserContext.Provider>
	);
};

export { CurrentUserContext, CurrentUserProvider };

CurrentUserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
