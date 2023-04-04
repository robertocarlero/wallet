import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UNPROTECTED_SCREENS } from '../constants/screens';

const AuthStack = createNativeStackNavigator();

export const AuthStackScreens = () => (
	<AuthStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		{Object.entries(UNPROTECTED_SCREENS).map(([key, props]) => (
			<AuthStack.Screen key={key} {...props} />
		))}
	</AuthStack.Navigator>
);
