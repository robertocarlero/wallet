import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import { COLORS } from '../../../constants/theme/colors';

export const ConfirmModal = ({ visible, onDismiss, title = '', description = '' }) => {
	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={onDismiss}
				style={{ backgroundColor: COLORS.light }}
			>
				<Dialog.Title>{title || '¿Quieres continuar?'}</Dialog.Title>

				<Dialog.Content>
					<Paragraph>{description || 'Esta operación puede ser irreversible.'}</Paragraph>
				</Dialog.Content>

				<Dialog.Actions>
					<View className="flex-row">
						<Button onPress={() => onDismiss && onDismiss('cancel')}>Cancelar</Button>
						<Button
							onPress={() => onDismiss && onDismiss('confirm')}
							mode="contained"
							className="shadow-2xl px-5"
						>
							Aceptar
						</Button>
					</View>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
