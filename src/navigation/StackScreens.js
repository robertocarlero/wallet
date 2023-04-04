import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PROTECTED_SCREENS } from '../constants/screens';

const Stack = createNativeStackNavigator();

export const StackScreens = () => (
	<Stack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		{Object.entries(PROTECTED_SCREENS).map(([key, props]) => (
			<Stack.Screen key={key} {...props} />
		))}
	</Stack.Navigator>
);
