import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';

import { restorePassword } from '../../api';

import { showToast } from '../../helpers/toast';

import SimpleForm from '../../components/common/SimpleForm';

import { SCREENS } from '../../constants/screens';
import { RECOVER_PASSWORD } from '../../constants/forms/schemas/recover-password';

import GlobalsStyles from '../../styles/GlobalsStyles';

const RecoverPassword = () => {
	const navigation = useNavigation();

	const handleCancel = () => {
		navigation.navigate(SCREENS.LOGIN.name);
	};

	const { mutate: getEmail } = useMutation(restorePassword, {
		mutationKey: 'getEmail',
		onError: ({ response }) => {
			showToast(response?.data?.message);
		},
		onSuccess: ({ data: message }) => {
			showToast(message);
			navigation.navigate(SCREENS.LOGIN.name);
		},
	});

	const handleSave = ({ email }) => {
		getEmail(email);
	};

	return (
		<SafeAreaView style={GlobalsStyles.AndroidSafeArea}>
			<View className="p-5">
				<SimpleForm
					title="Recuperar Contraseña"
					description="Por favor introduce tu correo electrónico para que puedas restaurar tu contraseña."
					schema={RECOVER_PASSWORD}
					onCancel={handleCancel}
					onSave={handleSave}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RecoverPassword;
