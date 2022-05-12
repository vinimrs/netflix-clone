import { Alert } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { alertAtom } from 'src/state/atoms';
import styled from 'styled-components';

export const StyledAlert = styled(Alert)`
	position: fixed;
	bottom: 40px;
	left: 32px;
	z-index: 90000;
	font-size: 18px;
	transition: 1s all;

	@media (max-width: 768px) {
		font-size: 14px;
	}
`;

const AlertComponent: React.FC = () => {
	const alert = useRecoilValue(alertAtom);

	if (!alert.message) return <div />;

	return (
		<StyledAlert
			variant="filled"
			// onClose={alertHook.clear}
			severity={alert.severity}
		>
			{alert.message}
		</StyledAlert>
	);
};

export default AlertComponent;
