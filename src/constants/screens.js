import {
	Welcome,
	Home,
	SignIn,
	SignUp,
	Services,
	ServiceRecharges,
	ServicePackages,
	Profile,
	AccountDetails,
	RecoverPassword,
	Withdraw,
} from '../screens';

export const SCREENS = {
	WELCOME: {
		name: 'Welcome',
		component: Welcome,
		forbidden: false,
	},
	LOGIN: {
		name: 'SignIn',
		component: SignIn,
		forbidden: false,
	},
	REGISTER: {
		name: 'SignUp',
		component: SignUp,
		forbidden: false,
	},
	RECOVER_PASSWORD: {
		name: 'RecoverPassword',
		component: RecoverPassword,
		forbidden: false,
	},
	HOME: {
		name: 'Home',
		component: Home,
		forbidden: true,
	},
	SERVICES: {
		name: 'Services',
		component: Services,
		forbidden: true,
	},
	RECHARGE: {
		name: 'Recharge',
		component: ServiceRecharges,
		forbidden: true,
	},
	PACKAGE: {
		name: 'Package',
		component: ServicePackages,
		forbidden: true,
	},
	PROFILE: {
		name: 'Profile',
		component: Profile,
		forbidden: true,
	},
	ACCOUNT_DETAILS: {
		name: 'AccountDetails',
		component: AccountDetails,
		forbidden: true,
	},
	WITHDRAW: {
		name: 'Withdraw',
		component: Withdraw,
		forbidden: true,
	},
};

export const PROTECTED_SCREENS = Object.values(SCREENS).filter(({ forbidden }) => forbidden);
export const UNPROTECTED_SCREENS = Object.values(SCREENS).filter(({ forbidden }) => !forbidden);
