import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import { RootSiblingParent } from 'react-native-root-siblings';
import { TailwindProvider } from 'tailwindcss-react-native';

import { ThemeProvider, CustomQueryClientProvider } from './containers/';
import { TokenContextProvider } from './context/TokenContextProvider';
import { ProfileContextProvider } from './context/ProfileContext';

import { axiosRequestInterceptor } from './helpers/axios-interceptors';

import { NavigationStack } from './navigation';

axios.interceptors.request.use(axiosRequestInterceptor);

export default function Main() {
	return (
		<RootSiblingParent>
			<TailwindProvider>
				<ThemeProvider>
					<CustomQueryClientProvider>
						<NavigationContainer>
							<ProfileContextProvider>
								<TokenContextProvider>
									<NavigationStack />
								</TokenContextProvider>
							</ProfileContextProvider>
						</NavigationContainer>
					</CustomQueryClientProvider>
				</ThemeProvider>
			</TailwindProvider>
		</RootSiblingParent>
	);
}
