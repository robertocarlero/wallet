import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { generateWithdrawTransaction } from '../../../api';
import { showToast } from '../../../helpers/toast';

import { useProfileContext } from '../../../context/ProfileContext';
import ConfirmModal from '../../common/ConfirmModal';
import SmallButton from '../../common/Buttons/SmallButton';

import { COLORS } from '../../../constants/theme/colors';
import {
	WITHDRAWAL_INTERVAL_ADD_AMOUNT,
	WITHDRAWAL_ACTIONS_AMOUNTS,
} from '../../../constants/transactions';
import Balance from '../../transactions/Balance';

export const WithdrawForm = () => {
	const [{ quota: balance } = {}] = useProfileContext();
	const [inputValue, setInputValue] = useState(0);
	const [isVisibleModal, setIsVisibleModal] = useState(false);

	const navigation = useNavigation();
	const queryClient = useQueryClient();

	const { mutate: createCashout, isLoading } = useMutation(generateWithdrawTransaction, {
		mutationKey: 'generateWithdrawTransaction',
		onError: (error) => {
			const { message } = error?.response?.data;
			showToast(message);
		},
		onSettled: () => queryClient.invalidateQueries('getPendingWithdrawTransactions'),
	});

	const onAddButtonPress = () => {
		setInputValue((currentValue) => currentValue + WITHDRAWAL_INTERVAL_ADD_AMOUNT);
	};

	const onMinusButtonPress = () => {
		setInputValue((currentValue) => {
			const newValue = currentValue - WITHDRAWAL_INTERVAL_ADD_AMOUNT;
			if (newValue < 0) return 0;
			return newValue;
		});
	};

	const onInputChange = (value) => {
		const newValue = Number(value);
		if (isNaN(newValue)) return;

		setInputValue(newValue);
	};

	const onQuickActionButtonPress = (newValue) => {
		setInputValue(newValue);
	};

	const onCancelButtonPress = () => {
		navigation.goBack();
	};

	const onContinueButtonPress = () => {
		setIsVisibleModal(true);
	};

	const onConfirmModalClose = (result) => {
		setIsVisibleModal(false);
		if (result !== 'confirm') return;
		createCashout(inputValue);
	};

	const notEnoughBalance = inputValue > balance;

	return (
		<>
			<Balance balance={balance} />

			<View className="w-full rounded-2xl bg-light p-5 mt-10">
				<View className="flex-row items-center gap-5 px-2">
					<SmallButton
						iconLibrary="FontAwesome"
						icon="plus"
						onTouch={onAddButtonPress}
						color={COLORS.primary}
					/>

					<TextInput
						keyboardType="number-pad"
						mode="outlined"
						placeholder="Ej. $7,000"
						value={`${inputValue}`}
						onChangeText={(value) => onInputChange(value)}
						className="flex-1 m-t-10 relative bottom-0.5"
					/>

					<SmallButton
						iconLibrary="FontAwesome"
						icon="minus"
						onTouch={onMinusButtonPress}
						color={COLORS.primary}
					/>
				</View>
				<Text className="font-normal text-base my-4 text-primaryDark">
					Acciones rápidas
				</Text>
				<FlatList
					horizontal
					data={WITHDRAWAL_ACTIONS_AMOUNTS}
					renderItem={({ item, index }) => (
						<Button
							className={`w-24 h-10 mr-3 bg-${
								index % 3 === 0 ? 'primary' : 'secondary'
							}`}
							onPress={() => onQuickActionButtonPress(item)}
						>
							<Text className="text-light">{item}</Text>
						</Button>
					)}
				/>
			</View>
			<View className="justify-end flex-row w-full mt-10">
				<Button
					mode="outlined"
					className="shadow-2xl px-5 mr-3"
					onPress={onCancelButtonPress}
				>
					Cancelar
				</Button>
				<Button
					mode="contained"
					className="shadow-2xl px-5"
					onPress={onContinueButtonPress}
					disabled={notEnoughBalance || inputValue === 0 || isLoading}
					loading={isLoading}
				>
					Confirmar
				</Button>
			</View>
			<ConfirmModal visible={isVisibleModal} onDismiss={onConfirmModalClose} />
		</>
	);
};
