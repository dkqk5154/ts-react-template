import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyled from 'styles/GlobalStyled';
import Spinner from 'components/atoms/Spinner';
import {myRouter} from 'config/routerUrl';

const MyPage = lazy(() => import('pages/MyPage/Route'));

const Styled = {
	Container: styled(GlobalStyled.Container)`
		height: 100%;
	`,
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		font-size: ${props => props.theme.fontSizes[2]}px;
		height: 100%;
	`,
	Title: styled(GlobalStyled.Row)`
		font-size: 2rem;
		margin-bottom: 1rem;
	`,
	MenuList: styled(GlobalStyled.Row)`
		padding: ${props => props.theme.space[2]}px;
		font-size: ${props => props.theme.fontSizes[2]}px;
	`,
};

const MyPageRouter = (): JSX.Element => {
	return (
		<Router>
			<Styled.Wrapper>
				<Suspense fallback={<Spinner height="80vh" size={'10rem'} />}>
					<Switch>
						<Route
							exact
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
		</Router>
	);
};

export default MyPageRouter;
