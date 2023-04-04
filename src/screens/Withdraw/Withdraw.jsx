import React from 'react';
import { SafeAreaView } from 'react-native';
import { useQuery } from 'react-query';

import { getPendingWithdrawTransactions } from '../../api';
import { showToast } from '../../helpers/toast';

import BackButton from '../../components/common/Buttons/BackButton';
import WithdrawForm from '../../components/views/WithdrawForm';
import WithdrawPendingTransactions from '../../components/views/WithdrawPendingTransactions';

import { TRANSACTIONS_STATUSES } from '../../constants/transactions';

import GlobalsStyles from '../../styles/GlobalsStyles';
import { ActivityIndicator } from 'react-native-paper';

export default function Withdraw() {
	const { data: { data } = {}, isLoading } = useQuery(
		'getPendingWithdrawTransactions',
		getPendingWithdrawTransactions,
		{
			onError: (error) => {
				const { message } = error?.response?.data;
				showToast(message);
			},
		}
	);

	const { status, verificationCode = '' } = data || {};

	return (
		<SafeAreaView className="mx-4" style={GlobalsStyles.AndroidSafeArea}>
			<BackButton />
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<>
					{status === TRANSACTIONS_STATUSES.PENDING ? (
						<WithdrawPendingTransactions verificationCode={verificationCode} />
					) : (
						<WithdrawForm />
					)}
				</>
			)}
		</SafeAreaView>
	);
}
