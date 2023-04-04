import React, { useState } from 'react';
import { SafeAreaView, View, Modal } from 'react-native';
import { Button } from 'react-native-paper';

import { PickerList } from '../../common/PickerList';

import GlobalsStyles from '../../../styles/GlobalsStyles';

export function PickerListModal({ isOpened, onClose, ...props }) {
	const [value, setValue] = useState(null);

	const onValueChange = (value) => {
		setValue(value);
	};

	const onContinueButtonPress = () => {
		onClose(value);
	};

	const onCancel = () => {
		setValue(null);
		onClose();
	};

	return (
		<>
			<Modal
				statusBarTranslucent={true}
				animationType="slide"
				transparent={true}
				visible={isOpened}
				onRequestClose={() => {
					onCancel();
				}}
			>
				<SafeAreaView
					style={GlobalsStyles.AndroidSafeArea}
					className="w-full h-full bg-lightSecondary rounded-t-3xl"
				>
					<View className="w-full h-full p-4">
						<PickerList value={value} onValueChange={onValueChange} {...props} />

						<View className="justify-end flex-row mb-3 mt-8">
							<Button
								mode="outlined"
								className="shadow-2xl px-5 mr-3"
								onPress={onCancel}
							>
								Cancelar
							</Button>

							<Button
								mode="contained"
								className="shadow-2xl px-5"
								onPress={onContinueButtonPress}
								disabled={!value}
							>
								Continuar
							</Button>
						</View>
					</View>
				</SafeAreaView>
			</Modal>
		</>
	);
}
