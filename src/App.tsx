import { Suspense, lazy, useEffect, useMemo } from 'react';
import { SWRConfig } from 'swr';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { ModalProvider } from 'react-modal-hook';

import createFetcher from 'config/fetcher';

import theme from 'styles/theme';

import Spinner from 'components/atoms/Spinner';

import { mainRouter, loginRouter, myRouter } from 'config/routerUrl';

import useCurrentUser from 'hooks/useCurrentUser';
import GlobalNav from 'components/molecules/GlobalNav';
// import useInterval from 'hooks/useInterval';

const MainPage = lazy(() => import('pages/MainPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const MyPage = lazy(() => import('pages/MyPage'));

// const TermPage = lazy(() => import('pages/TermPage'));
// const PrivacyPage = lazy(() => import('pages/PrivacyPage'));

// const Privacy = lazy(() => importMDX('pages/Privacy.mdx'));

const swrConfig: object = {
	onErrorRetry: (
		error: any,
		key: any,
		option: any,
		revalidate: any,
		{ retryCount }: any,
	) => {
		// if (retryCount >= 3) return;
		if (error.response) {
			if (error.response.status === 404) return;
		}
		// if (error.response && error.response.status === 403) {
		// 	Swal.fire(globalSwal.apiErr);
		// 	return;
		// }
		// setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000);
	},
};

const Styled = {
	Wrapper: styled.div`
		width: 100%;
		height: 100vh;
	`,
};

function App() {
	const { currentUser, accessToken, getCurrentUser } = useCurrentUser();

	useEffect(() => {
		async function loading() {
			await getCurrentUser();
		}
		loading();
	}, [getCurrentUser]);

	useEffect(() => {
		let tokenReload = '' as any;
		getCurrentUser();
		if (currentUser) {
			tokenReload = setInterval(() => {
				// if (jwt.decode(currentUser) !== null) {
				const decodeIdTokenExpTime = jwt.decode(currentUser);
				const idTokenExpFormat = Number(
					moment
						.unix((decodeIdTokenExpTime as any).exp)
						.format('YYMMDDHHmmss'),
				);
				const todayFormat = Number(moment().format('YYMMDDHHmmss'));
				// console.log('idTokenExpFormat : ', idTokenExpFormat);
				// console.log('todayFormat : ', todayFormat);
				// console.log('format result : ', idTokenExpFormat < todayFormat);
				if (idTokenExpFormat < todayFormat) {
					console.log(
						'---------------token reload-------------------',
					);
					getCurrentUser();
				}
				// }
			}, 1000);
			return () => {
				clearInterval(tokenReload);
			};
		}

		// eslint-disable-next-line
	}, [currentUser]);

	const fetcher = useMemo(() => createFetcher(accessToken), [accessToken]);

	return (
		<Router>
			<SWRConfig value={{ ...swrConfig, fetcher }}>
				<ThemeProvider theme={theme}>
					<ModalProvider>
						<Styled.Wrapper>
							<GlobalNav />
							<Suspense
								fallback={
									<Spinner height="80vh" size={'10rem'} />
								}
							>
								<Switch>
									<Route
										exact
										path={mainRouter.root.value}
										component={MainPage}
									/>
									<Route
										exact
										path={loginRouter.root.value}
										component={LoginPage}
									/>
									<Route
										path={myRouter.root.value}
										component={MyPage}
									/>
									<Route
										component={() => {
											return <div>Err</div>;
										}}
									/>
								</Switch>
							</Suspense>
						</Styled.Wrapper>
					</ModalProvider>
				</ThemeProvider>
			</SWRConfig>
		</Router>
	);
}

export default App;
