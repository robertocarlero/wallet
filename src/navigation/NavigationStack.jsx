import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useToken } from '../context/TokenContextProvider';

import { AuthStackScreens } from './AuthStackScreens';
import { StackScreens } from './StackScreens';

const RootStack = createNativeStackNavigator();

export default function NavigationStack() {
	const [isLoggedIn] = useToken();

	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{isLoggedIn ? (
				<RootStack.Screen
					name="App"
					component={StackScreens}
					options={{
						animationEnabled: false,
					}}
				/>
			) : (
				<RootStack.Screen
					name="Auth"
					component={AuthStackScreens}
					options={{
						animationEnabled: false,
					}}
				/>
			)}
		</RootStack.Navigator>
	);
}
