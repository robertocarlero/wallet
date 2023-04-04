import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, Text, Pressable } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { cancelWithdrawTransaction } from '../../../api';
import { showToast } from '../../../helpers/toast';

import ConfirmModal from '../../common/ConfirmModal';

import { SCREENS } from '../../../constants/screens';

import GlobalsStyles from '../../../styles/GlobalsStyles';

export const WithdrawPendingTransactions = ({ verificationCode }) => {
	const [isVisibleModal, setIsVisibleModal] = useState(false);
	const queryClient = useQueryClient();
	const navigation = useNavigation();

	const verificationCodeDigits = (verificationCode || '').toString().split('');

	const { mutate: cancelCashout, isLoading } = useMutation(cancelWithdrawTransaction, {
		mutationKey: 'cancelWithdrawTransaction',
		onError: (error) => {
			const { message } = error?.response?.data;
			showToast(message);
		},
		onSuccess: () => {
			showToast('Solicitud cancelada con éxito.');
			navigation.navigate(SCREENS.HOME.name);
			queryClient.invalidateQueries('getPendingWithdrawTransactions');
		},
	});

	const onCancelButtonPress = () => {
		setIsVisibleModal(true);
	};

	const onContinueButtonPress = () => {
		navigation.navigate(SCREENS.HOME.name);
	};

	const onConfirmModalClose = (result) => {
		setIsVisibleModal(false);
		if (result !== 'confirm') return;
		cancelCashout();
	};

	return (
		<SafeAreaView style={GlobalsStyles.AndroidSafeArea} className="mx-5">
			<View className="mt-5">
				<Text className="font-normal text-2xl text-primaryDark">PIN de transacción</Text>

				<Text className="font-normal text-base mt-5 text-medium">
					Este es tu código de seguridad OTP, guardalo muy bien.
				</Text>
			</View>

			<View className="flex-row justify-around my-5">
				{verificationCodeDigits?.map((number) => (
					<View
						key={number}
						className="shadow-2xl border-gray-600 bg-secondary my-4 justify-center items-center min-h-[58px] min-w-[58px] rounded-xl"
					>
						<Text className="text-4xl">{number}</Text>
					</View>
				))}
			</View>

			<View>
				<Text className="font-normal text-base text-medium text-center">
					Recuerda no compartir tu pin con otras personas.
				</Text>

				<Pressable className="flex-row justify-center" onPress={onCancelButtonPress}>
					<Text className="font-normal text-base mt-5 text-primary">Cancelar</Text>
				</Pressable>
			</View>

			<Button
				mode="contained"
				className="shadow-2xl px-5 mt-5"
				onPress={onContinueButtonPress}
				loading={isLoading}
				disabled={isLoading}
			>
				Aceptar
			</Button>

			<ConfirmModal visible={isVisibleModal} onDismiss={onConfirmModalClose} />
		</SafeAreaView>
	);
};
