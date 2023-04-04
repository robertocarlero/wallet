import { View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { COLORS } from '../../../constants/theme/colors';
import { SCREENS } from '../../../constants/screens';

export function ActionButton({ title, icon, color = COLORS.black, name }) {
	const navigation = useNavigation();

	const handlePress = () => {
		if (name === 'services') return navigation.navigate(SCREENS.SERVICES.name);
		if (name === 'withdraw') return navigation.navigate(SCREENS.WITHDRAW.name);
	};

	return (
		<Pressable className="flex-col justify-center content-around w-24" onPress={handlePress}>
			<View
				style={{ backgroundColor: color }}
				className="h-24 w-24 rounded-3xl justify-center items-center"
			>
				<Icon name={`${icon}`} size={40} color={COLORS.light} />
			</View>

			<Text
				className="text-center mt-1 text-xs font-bold"
				lineBreakMode="tail"
				numberOfLines={1}
				maxFontSizeMultiplier={2}
				ellipsizeMode="tail"
			>{`${title}`}</Text>
		</Pressable>
	);
}
