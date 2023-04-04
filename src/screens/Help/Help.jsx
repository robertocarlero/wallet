import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppIcon from '../../components/common/AppIcon';

import { ICON_SIZES } from '../../constants/sizes';
import { COLORS } from '../../constants/theme/colors';
import { SCREENS } from '../../constants/screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalsStyles from '../../styles/GlobalsStyles';

const Help = () => {
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);

	const handlePressButton = () => {
		navigation.navigate(SCREENS.RECOVER_PASSWORD.name);
	};

	return (
		<>
			<Modal
				statusBarTranslucent={true}
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<SafeAreaView
					style={[styles.modalView, GlobalsStyles.AndroidSafeArea]}
					className="w-full h-full bg-primary opacity-90 rounded-t-3xl justify-end items-end"
				>
					<View className="bottom-32">
						<Pressable onPress={handlePressButton}>
							<Text className="mb-3 mr-9 text-center font-bold text-xl text-light">
								Recuperar Contraseña
							</Text>
						</Pressable>

						<Text className="mb-3 mr-9 text-right font-bold text-xl text-light">
							Soporte
						</Text>
					</View>

					<Pressable
						className="absolute bottom-9 right-5 w-16 h-16 shadow-outline rounded-3xl bg-light items-center justify-center"
						onPress={() => setModalVisible(!modalVisible)}
					>
						<Text>
							<AppIcon
								library="FontAwesome"
								name="times"
								size={ICON_SIZES.MEDIUM}
								color={COLORS.primary}
							/>
						</Text>
					</Pressable>
				</SafeAreaView>
			</Modal>

			<Pressable
				className={`absolute bottom-9 right-5 bg-primary w-16 h-16 shadow-outline rounded-3xl justify-center  items-center`}
				onPress={() => setModalVisible(true)}
			>
				<Text>
					<AppIcon
						library="FontAwesome"
						name="question"
						size={ICON_SIZES.MEDIUM}
						color={COLORS.light}
					/>
				</Text>
			</Pressable>
		</>
	);
};

export default Help;

const styles = StyleSheet.create({
	modalView: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
