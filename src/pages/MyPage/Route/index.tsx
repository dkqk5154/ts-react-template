import React from 'react';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';

import GlobalStyled from 'styles/GlobalStyled';

import ProfileSvg from 'images/ic-user-profile.svg';

import {loginRouter} from 'config/routerUrl';
import useCurrentUser from 'hooks/useCurrentUser';

import MenuButtons from 'components/molecules/MenuButtons';
import Button from 'components/atoms/Button';

const Styled = {
	Container: styled(GlobalStyled.Container)`
		height: 100%;
	`,
	Wrapper: styled(GlobalStyled.Row)`
		flex-direction: column;
		font-size: ${props => props.theme.fontSizes[2]}px;
		height: 100%;
	`,
	Line: styled(GlobalStyled.Row)`
		height: 1px;
		background-color: ${props => props.theme.colors.white};
		opacity: 30%;
	`,
	Button: styled(Button)`
		border: 2px solid;
		border-color: ${props => props.theme.colors.white};
		padding: ${props => props.theme.space[2]}px;
		font-size: ${props => props.theme.fontSizes[3]}px;
		width: 100%;
		height: 36px;
		:hover {
			border: 2px solid;
			border-color: ${props => props.theme.colors.white};
		}
		:active {
			background-color: ${props => props.theme.colors.white};
			color: ${props => props.theme.colors.blue500};
		}
	`,
};

const MenuListPage = (): JSX.Element => {
	const {  name, currentUser, deleteSession } =
		useCurrentUser();
	const userInfo = jwt.decode(currentUser) as { [key: string]: string };

	const menuList = [
		{
			children: '썬디 이용가이드',
			imageName: 'rightArrow',
			onClick: () => {
				window.location.href =
					'https://post.naver.com/my/series/detail.nhn?memberNo=44787384&seriesNo=513498';
			},
			disabled: false,
		},
	
	];

	const handleClickSetPasswordButton = () => {};

	const handleClickSetSecondaryPasswordButton = () => {
	};

	const handleClickLogoutButton = async (e: any) => {
		e.preventDefault();
		await deleteSession();
	};

	const handleClickLoginButton = () => {
		window.location.href = loginRouter.root.value;
	};

	return (
		<Styled.Wrapper>
			<Styled.Container>
				<GlobalStyled.HeightRow bg="blue500">
					<GlobalStyled.Row color="white" p={4}>
						{currentUser ? (
							<>
								<GlobalStyled.CenterCol mr={3}>
									<img src={ProfileSvg} alt="err" />
								</GlobalStyled.CenterCol>
								<GlobalStyled.CenterCol>
									<GlobalStyled.HeightRow>
										<GlobalStyled.Row fontSize={1}>
											{userInfo
												? userInfo.name
												: 'user name'}
										</GlobalStyled.Row>
										<GlobalStyled.Row
											mt={1}
											mb={1}
											fontSize={3}
										>
											<b> 안전관리사 {name}님</b>
										</GlobalStyled.Row>
										<GlobalStyled.Row fontSize={2}>
											등록된 발전소 &nbsp;&nbsp;&nbsp;{' '}
											
										</GlobalStyled.Row>
									</GlobalStyled.HeightRow>
								</GlobalStyled.CenterCol>
							</>
						) : (
							<GlobalStyled.HeightRow>
								<GlobalStyled.CenterRow
									mt={3}
									mb={6}
									fontSize={5}
								>
									<b> 로그인이 필요한 서비스입니다. </b>
								</GlobalStyled.CenterRow>
								<GlobalStyled.Row>
									<Styled.Button
										onClick={handleClickLoginButton}
										isGhost
									>
										<b> 로그인 </b>
									</Styled.Button>
								</GlobalStyled.Row>
							</GlobalStyled.HeightRow>
						)}
					</GlobalStyled.Row>
					<Styled.Line />
					{currentUser ? (
						<GlobalStyled.Row color="white" p={4}>
							<GlobalStyled.HeightRow>
								<GlobalStyled.Row mb={4}>
									<Styled.Button
										mr={3}
										onClick={handleClickSetPasswordButton}
										disabled
									>
										비밀번호 변경
									</Styled.Button>
									<Styled.Button
										onClick={
											handleClickSetSecondaryPasswordButton
										}
									>
										2차 보안번호 설정
									</Styled.Button>
								</GlobalStyled.Row>
								<GlobalStyled.Row>
									<Styled.Button
										onClick={handleClickLogoutButton}
									>
										로그아웃
									</Styled.Button>
								</GlobalStyled.Row>
							</GlobalStyled.HeightRow>
						</GlobalStyled.Row>
					) : (
						''
					)}
				</GlobalStyled.HeightRow>
				<GlobalStyled.HeightRow height="80%" p={4}>
					<MenuButtons infos={menuList} />
				</GlobalStyled.HeightRow>
			</Styled.Container>
		</Styled.Wrapper>
	);
};

export default MenuListPage;
