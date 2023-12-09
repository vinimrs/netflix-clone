import React, { useState } from 'react';
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { userService } from '../../../services/userService';
import { useRouter } from 'next/router';

interface DeleteAccountModalProps {
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	openDeleteModal: boolean;
	userId: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
	setOpenDeleteModal,
	openDeleteModal,
	userId,
}) => {
	const router = useRouter();
	const [confirmMessage, setConfirmMessage] = useState({
		message: '',
		error: false,
	});

	const deleteUser = (userId: string) => {
		userService.deleteUser(userId).then(res => {
			if (res.ok) {
				setConfirmMessage({
					message: 'Usuário deletado com sucesso',
					error: false,
				});
				router.push('/login');
			} else {
				setConfirmMessage({
					message: 'Erro ao deletar o usuário',
					error: true,
				});
			}
		});
	};

	const handleClose = () => {
		setOpenDeleteModal(false);
	};
	return (
		<Dialog
			open={openDeleteModal}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle style={{ color: 'black' }} id="alert-dialog-title">
				{'Deseja deletar sua conta?'}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Ao deletar sua conta você perderá{' '}
					<strong>todos os seus dados e perfis aqui presentes.</strong>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Voltar</Button>
				<Button
					onClick={() => {
						deleteUser(userId);
					}}
				>
					Deletar mesmo assim
				</Button>
			</DialogActions>
			{confirmMessage.message && (
				<Alert
					onClose={() => setConfirmMessage({ message: '', error: false })}
					severity={confirmMessage.error ? 'error' : 'success'}
				>
					{confirmMessage.message}
				</Alert>
			)}
		</Dialog>
	);
};

export default DeleteAccountModal;
