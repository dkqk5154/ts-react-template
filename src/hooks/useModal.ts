// import React from 'react';
// import ReactDOM from 'react-dom';
// import styled from 'styled-components';

// const Styled = {
// 	Wrapper: styled.div<{ isModal: boolean }>`
// 		display: ${props => (props.isModal ? 'flex' : 'none')};
// 		color: #ffffff;
// 		position: fixed;
// 		z-index: 31;
// 		top: 0;
// 		right: 0;
// 		bottom: 0;
// 		left: 0;
// 		flex-direction: row;
// 		align-items: center;
// 		justify-content: center;
// 		background-color: rgba(0, 0, 0, 0.7);
// 		text-align: center;
// 	`,

// 	ModalContent: styled.div`
// 		background-color: #fefefe;
// 		margin: 20% auto;
// 		border-radius: 10px;
// 		animation: modalShow 0.15s;
// 		@keyframes modalShow {
// 			from {
// 				transform: scale(0);
// 			}
// 			to {
// 				transform: scale(1);
// 			}
// 		}
// 		@keyframes modalClose {
// 			from {
// 				transform: scale(0);
// 			}
// 			to {
// 				transform: scale(1);
// 			}
// 		}
// 		h2 {
// 			font-size: 25px;
// 		}
// 	`,
// };

// function handleChangeModal(isShowModal: boolean, children?: any) {
// 	if (isShowModal) {
// 		if (document.getElementById('modalBox')) {
// 			document.getElementById('modalBox').style.display = 'flex';
// 		}
// 		const modalElement = React.createElement(
// 			'div',
// 			{
// 				id: 'modalBox',
// 				onClick: () =>
// 					(document.getElementById('modalBox').style.display =
// 						'none'),
// 			},
// 			children,
// 		);
// 		ReactDOM.render(modalElement, document.getElementById('modalWrapper'));
// 		// ReactDOM.render(children, document.getElementById('modalBox'))
// 	} else {
// 		document.getElementById('modalBox').remove();
// 	}
// }

// export default function useModal(children?: any) {
// 	const showModal = () => {
// 		handleChangeModal(true, children);
// 	};
// 	const hideModal = () => {
// 		handleChangeModal(false, children);
// 	};
// 	return [showModal, hideModal];
// }

export default function test() {}
