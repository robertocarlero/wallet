import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme/colors';

const SHADOW_COLOR = COLORS.dark;

export default StyleSheet.create({
	Shadow: {
		shadowColor: SHADOW_COLOR,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.1,
	},
});
