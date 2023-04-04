import { useCallback } from 'react';
import { ScrollView, SafeAreaView, View, BackHandler, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { IconButton, Text } from 'react-native-paper';

import { getCashout, getProfile } from '../../api';

import { capitalize } from '../../helpers/string';

import { useProfileContext } from '../../context/ProfileContext';

import Avatar from '../../components/common/Avatar';
import Balance from '../../components/transactions/Balance';
import ActionsButtonsList from '../../components/transactions/ActionsButtonsList';
import TransactionsItemsList from '../../components/transactions/TransactionsItemsList';

import { COLORS } from '../../constants/theme/colors';
import { SCREENS } from '../../constants/screens';

import GlobalsStyles from '../../styles/GlobalsStyles';

export default function Home() {
	const [profile, setProfile] = useProfileContext();

	const navigation = useNavigation();

	useQuery('getProfile', getProfile, {
		onError: (error) => {
			const { message } = error?.response?.data;
			showToast(message);
		},

		onSuccess: ({ data }) => {
			setProfile((prev) => ({ ...prev, ...data }));
		},
	});

	const { name, quota, urlImage } = profile || {};

	const handlePressAvatar = () => {
		navigation.navigate(SCREENS.PROFILE.name);
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				Alert.alert('Salir', '¿Estás seguro?', [
					{ text: 'No' },
					{ text: 'Si', onPress: () => BackHandler.exitApp() },
				]);
				return true;
			};

			navigation.addListener('gestureEnd', backAction);
			const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

			return () => {
				backHandler.remove();
				navigation.removeListener('gestureEnd', backAction);
			};
		}, [])
	);

	return (
		<ScrollView className="px-5">
			<SafeAreaView style={GlobalsStyles.AndroidSafeArea}>
				<View className="flex-row justify-between h-16">
					<View className="relative -left-4">
						<IconButton icon="menu" iconColor={COLORS.primary} />
					</View>

					<Avatar src={urlImage} alt={name} showCloud onPress={handlePressAvatar} />
				</View>

				<View className="mb-5">
					<Text className="text-2xl text-medium">Hola,</Text>
					<Text className="text-3xl">{capitalize(name)}</Text>
				</View>

				<Balance size="big" balance={quota} />

				<ActionsButtonsList className="mt-5" />

				<TransactionsItemsList className="mt-5" />
			</SafeAreaView>
		</ScrollView>
	);
}
