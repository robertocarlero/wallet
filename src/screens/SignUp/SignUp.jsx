import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';

import { showToast } from '../../helpers/toast';

import { registerUser } from '../../api';

import { useToken } from '../../context/TokenContextProvider';
import { SignUpFormLoadingContextProvider } from './LoadingContext';

import SignUpForm from '../../components/views/SignUpForm';

import { SCREENS } from '../../constants/screens';

export default function SignUp() {
	const navigation = useNavigation();
	const [_, setToken] = useToken();

	const { mutate: sendData, isLoading } = useMutation(registerUser, {
		mutationKey: 'registerUser',
		onError: () => {
			showToast('Ha ocurrido un error inesperado.');
		},
		onSuccess: ({ token }) => {
			setToken(token);
		},
	});

	const handleFinish = (data) => {
		if (!data) return navigation.navigate(SCREENS.WELCOME.name);
		sendData(data);
	};

	return (
		<SignUpFormLoadingContextProvider isLoading={isLoading}>
			<SignUpForm onFinish={handleFinish} />
		</SignUpFormLoadingContextProvider>
	);
}
