import React from 'react';
import styled, { StyledProps } from 'styled-components';

import GlobalStyled from 'styles/GlobalStyled';

import TextBrFormat from 'components/atoms/TextBrFormat';

const Styled = {
	Wrapper: styled(GlobalStyled.HeightRow)`
		width: 100%;
		font-size: ${props => props.theme.fontSizes[2]}px;
		overflow-x: auto;
	`,
	HeaderWrapper: styled(GlobalStyled.Row)<{ width: string }>`
		width: ${props => props.width};
	`,
	CellWrapper: styled(GlobalStyled.HeightRow)<{ width: string }>`
		width: ${props => props.width};
	`,
};

export type TableHeaderInfoProps = { key: any; label: any; width?: number };
export type TableCellInfoProps = {
	[key: string]: string | number | React.ReactNode;
};

export const formatCellInfosMatchHeaderInfos = ({
	headerInfos,
	cellInfos,
}: {
	headerInfos: TableProps['TableHeader'];
	cellInfos: TableProps['TableCell'];
}): Array<Array<TableHeaderInfoProps>> => {
	return cellInfos.map((res: TableCellInfoProps) => {
		return headerInfos.map((headerRes: TableHeaderInfoProps) => {
			let headerResult = { key: '', label: '' } as {
				key: string;
				label: any;
				width?: number;
			};
			Object.keys(res).some((keyRes: string) => {
				if (keyRes === headerRes.key) {
					headerResult.key = keyRes;
					headerResult.label = res[keyRes];
					headerResult.width = headerRes.width;
				}
				return keyRes === headerRes.key;
			});

			return headerResult;
		});
	});
};

export interface TableProps {
	TableHeader: StyledProps<any>;
	TableCell: StyledProps<any>;
	TableCellRow: StyledProps<any>;
	TableHeaderContainer: StyledProps<any>;
	TableCellContainer: StyledProps<any>;
	headerInfos: Array<TableHeaderInfoProps>;
	cellInfos: Array<TableCellInfoProps>;
	width: string;
	isShowHeader: boolean;
}

const Table = (props: TableProps) => {
	const {
		headerInfos,
		cellInfos,
		TableHeader,
		TableHeaderContainer,
		TableCell,
		width,
		isShowHeader,
		TableCellRow,
		TableCellContainer,
	} = props;

	const headerListComponents = headerInfos.map(
		(res: TableHeaderInfoProps) => {
			return (
				<TableHeader
					key={res.key}
					width={res?.width ? res.width : 100 / headerInfos.length}
				>
					<TextBrFormat value={res.label} />
				</TableHeader>
			);
		},
	);

	const formatCellInfoComponents = formatCellInfosMatchHeaderInfos({
		headerInfos,
		cellInfos,
	});

	const cellListComponents = formatCellInfoComponents.map(
		(res: Array<TableHeaderInfoProps>, i: number) => {
			const cellInfoComponents = res.map(
				(inRes: TableHeaderInfoProps) => {
					return (
						<TableCell
							key={inRes.key}
							width={
								inRes?.width
									? inRes.width
									: 100 / headerInfos.length
							}
						>
							{inRes.label}
						</TableCell>
					);
				},
			);
			return <TableCellRow key={i}>{cellInfoComponents}</TableCellRow>;
		},
	);

	return (
		<Styled.Wrapper>
			{isShowHeader ? (
				<Styled.HeaderWrapper width={width}>
					<TableHeaderContainer>
						{headerListComponents}
					</TableHeaderContainer>
				</Styled.HeaderWrapper>
			) : (
				''
			)}

			<Styled.CellWrapper width={width}>
				<TableCellContainer>{cellListComponents}</TableCellContainer>
			</Styled.CellWrapper>
		</Styled.Wrapper>
	);
};
Table.defaultProps = {
	TableHeader: styled(GlobalStyled.CenterCol)`
		color: ${props => props.theme.colors.white};
		flex-direction: column;
	`,
	TableHeaderContainer: styled(GlobalStyled.Row)`
		padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[4]}px`};
		background-color: ${props => props.theme.colors.primary3};
	`,
	TableCell: styled(GlobalStyled.CenterCol)``,
	TableCellContainer: styled(GlobalStyled.HeightRow)``,
	TableCellRow: styled(GlobalStyled.Row)`
		padding: ${({ theme }) => `${theme.space[2]}px ${theme.space[4]}px`};
		border-bottom: 1px solid ${props => props.theme.colors.gray4};
	`,
	headerInfos: [
		{ key: 'header1', label: '헤더1' },
		{ key: 'header2', label: '헤더2' },
		{ key: 'header3', label: '헤더3' },
	],
	cellInfos: [
		{ header1: '내용1', header2: '내용2', header3: '내용3' },
		{ header2: '내용1', header1: '내용2', header3: '내용3' },
		{ header2: '내용1', header3: '내용2', header1: '내용3' },
	],
	width: '100%',
	isShowHeader: true,
};

export default Table;
