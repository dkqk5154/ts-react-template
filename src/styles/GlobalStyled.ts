import styled, { keyframes } from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
	LayoutProps,
	flexbox,
	FlexboxProps,
} from 'styled-system';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';

const animation: any = {
	fadeInUp: keyframes`
		0%{
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
		`,
};

type ParentTypes =
	| (ColorProps & TypographyProps & SpaceProps & LayoutProps)
	| FlexboxProps;

const Parent = {
	Col: styled.div<{ width?: number } & ParentTypes>`
		display: flex;
		width: ${props => props.width}%;
		align-items: center;
		${typography}
		${space}
        ${color}
		${flexbox}
	`,
	ContentCol : styled.div<{ width?: number } & ParentTypes>`
		display: flex;
		width: ${props => props.width}%;
		align-items: center;
		background-color: ${({ theme})=>theme.colors.gray5};
		border: 1px solid ${({ theme})=>theme.colors.gray3};
		${typography}
		${space}
        ${color}
		${flexbox}
	
	`,
	Row: styled.div<ParentTypes>`
		display: flex;
		width: 100%;
		
		${typography}
		${space}
		${color}
		${layout}
		${flexbox}
	`,
	Container: styled.div<ParentTypes>`
		display: flex;
		flex-direction:  column;
		width: 100%;
		height: 100%;
		min-width : 360px;
		margin: 0 auto;
		${typography}
		${space}
        ${color}
        ${layout}
		${flexbox}
	`,

	Link: styled(Link)<ParentTypes & LinkProps>`
		display: flex;
		color: inherit;
		${typography}
		${space}
        ${color}
        ${layout}
		${flexbox}
	`,
	NavLink: styled(NavLink)<ParentTypes & NavLinkProps>`
		display: flex;
		color: inherit;
		${typography}
		${space}
		${color}
		${layout}
		${flexbox}
	`,
	PopupWrapper: styled.div<ParentTypes>`
		border: 2px solid ${props => props.theme.colors.gray200};
		border-radius: 0.5rem;
		padding: 1rem;
		color: ${props => props.theme.colors.lightBlack};
		background-color: ${props => props.theme.colors.white};
		${typography}
		${space}
        ${color}
        ${layout}
		${flexbox}
	`,
	Img: styled.img<ParentTypes>`
		display: flex;
		${typography}
		${space}
        ${color}
        ${layout}
		${flexbox}
	`,
};

const GlobalStyled = {
	Container: styled(Parent.Container)`
        ${Parent.ContentCol}:last-child {
			border-left : 0px;
			border-right : 0px;
		}
	`,
	Row: styled(Parent.Row)``,
	FadeInUpRow: styled(Parent.Row)`
		animation: ${animation.fadeInUp} 1s;
	`,
	HeightRow: styled(Parent.Row)`
		flex-direction: column;
	`,
	CenterRow: styled(Parent.Row)`
		align-items: center;
		justify-content: center;
	`,

	Col: styled(Parent.Col)``,
	ContentCol: Parent.ContentCol,
	CenterCol: styled(Parent.Col)`
		align-items: center;
		justify-content: center;
	`,
	RightCol: styled(Parent.Col)`
		align-items: center;
		justify-content: flex-end;
	`,
	RowLink: styled(Parent.Link)`
		width: 100%;
	`,
	Link: styled(Parent.Link)``,
	RowNavLink: styled(Parent.NavLink)`
		width: 100%;
	`,
	NavLink: styled(Parent.NavLink)``,
	PopupWrapper: styled(Parent.PopupWrapper)``,
	Img: styled(Parent.Img)<{ size: string | number }>`
		width: ${props => props.size};
		height: ${props => props.size};
	`,
};

export default GlobalStyled;
