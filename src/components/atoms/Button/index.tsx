import React from 'react';
import styled from 'styled-components';
import {
	typography,
	TypographyProps,
	space,
	SpaceProps,
	color,
	ColorProps,
	layout,
	border,
	BorderProps,
} from 'styled-system';
import theme from 'styles/theme';

export type colorThemeProps = {
	[key: string]: {
		backgroundColor: string;
		hoverBackgroundColor: string;
		pressedBackgroundColor: string;
	};
};

export type buttonLevelProps = {
	[key in 1 | 2 | 3]: {
		padding: number;
		height: number;
		fontSize: number;
	};
};

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
	colorTheme?: keyof colorThemeProps;
	width?: string;
	isGhost?: boolean;
	isActiveHover?: boolean;
	border: string;
	borderRadius: string | number;
	level: number;
	[key: string]: any;
}

const colorThemems: colorThemeProps = {
	blue: {
		backgroundColor: theme.colors.primary4,
		hoverBackgroundColor: theme.colors.primary4,
		pressedBackgroundColor: theme.colors.primary4,
	},
};

const buttonLevels: buttonLevelProps = {
	1: {
		padding: theme.space[3],
		height: 32,
		fontSize: theme.fontSizes[3],
	},
	2: {
		padding: theme.space[4],
		height: 48,
		fontSize: theme.fontSizes[4],
	},
	3: {
		padding: theme.space[6],
		height: 56,
		fontSize: theme.fontSizes[5],
	},
};

type MultiTypes = ColorProps & TypographyProps & SpaceProps & BorderProps;

const Button = styled.button<MultiTypes & ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	font-weight: bold;
	width: 100%;
	border-radius: ${({ theme }) => theme.radius[1]}px;
	font-size: ${({ level }) =>
		level ? buttonLevels[level].fontSize + 'px' : '1rem'};
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	padding: ${({ level }) =>
		'0px ' +
		buttonLevels[level].padding +
		'px 0px ' +
		buttonLevels[level].padding +
		'px'};
	height: ${({ level }) => buttonLevels[level].height}px;
	background-color: ${({ colorTheme }) =>
		colorTheme
			? colorThemems[colorTheme].backgroundColor
			: colorThemems['blue'].backgroundColor};
	border: ${({ colorTheme, theme }) =>
		colorTheme
			? colorTheme === 'ghost' && 'background'
				? '2px solid' + theme.colors.blue500
				: '0px'
			: '0px'};
	color: ${({ colorTheme, theme }) =>
		colorTheme
			? colorTheme === 'ghost' && 'background'
				? theme.colors.blue500
				: theme.colors.white
			: theme.colors.white};
	:hover {
		background-color: ${({ colorTheme }) =>
			colorTheme
				? colorThemems[colorTheme].hoverBackgroundColor
				: colorThemems['blue'].hoverBackgroundColor};
		box-shadow: 0 0 6px
			${({ colorTheme }) =>
				colorTheme
					? colorThemems[colorTheme].hoverBackgroundColor
					: colorThemems['blue'].hoverBackgroundColor};
		color: ${({ theme }) => theme.colors.white};
	}
	:disabled {
		opacity: 40%;
		:hover {
			background-color: ${({ colorTheme }) =>
				colorTheme
					? colorThemems[colorTheme].backgroundColor
					: colorThemems['blue'].backgroundColor};
			color: ${({ colorTheme, theme }) =>
				colorTheme
					? colorTheme === 'ghost' && 'background'
						? theme.colors.blue500
						: theme.colors.white
					: theme.colors.white};
			box-shadow: none;
		}
	}
	:active {
		background-color: ${({ colorTheme }) =>
			colorTheme
				? colorThemems[colorTheme].pressedBackgroundColor
				: colorThemems['blue'].pressedBackgroundColor};
		box-shadow: none;
		color: ${({ colorTheme, theme }) =>
			colorTheme
				? colorTheme === 'ghost' && 'background'
					? theme.colors.blue500
					: theme.colors.white
				: theme.colors.white};
	}
	${typography}
	${space}
    ${color}
    ${layout}
	${border}
`;

Button.defaultProps = {
	isGhost: false,
	isActiveHover: true,
	level: 1,
};

export default Button;

export interface TransparentButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	isActiveHover?: boolean;
	[key: string]: any;
}

export const TransparentButton = styled.button<
	MultiTypes & TransparentButtonProps
>`
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
	font-size: 1rem;
	width: 100%;
	background-color: rgba(255, 255, 255, 0);
	border-color: rgba(255, 255, 255, 0);
	cursor: pointer;
	:hover {
		font-weight: ${({ isActiveHover }) => (isActiveHover ? '500' : '400')};
	}
	${typography}
	${space}
	${color}
	${layout}
`;

export type flatcolorThemeProps = {
	[key in 'blue' | 'gray']: {
		backgroundColor: string;
		hoverBackgroundColor: string;
		pressedBackgroundColor: string;
	};
};

export interface FlatButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	colorTheme: string;
	[key: string]: any;
}
