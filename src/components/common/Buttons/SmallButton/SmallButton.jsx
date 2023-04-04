import { Pressable } from 'react-native';

import AppIcon from '../../AppIcon';

import { ICON_SIZES } from '../../../../constants/sizes';

import { COLORS } from '../../../../constants/theme/colors';

export function SmallButton({
	icon,
	className,
	color = COLORS.transparent,
	iconColor = COLORS.light,
	iconSize = ICON_SIZES.MEDIUM,
	iconLibrary,
	onTouch,
	...props
}) {
	const handlePress = () => onTouch && onTouch();

	return (
		<Pressable
			{...props}
			onPress={handlePress}
			className={`h-[50px] w-[50px] rounded-lg justify-center items-center ${className}`}
			style={{ backgroundColor: color }}
		>
			<AppIcon name={icon} size={iconSize} color={iconColor} library={iconLibrary} />
		</Pressable>
	);
}
