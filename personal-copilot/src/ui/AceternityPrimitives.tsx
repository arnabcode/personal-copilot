import React from 'react';
import { Text, TouchableOpacity, ViewProps, TextProps, TouchableOpacityProps } from 'react-native';
import { MotiView } from 'moti';

function cn(style: any, extra?: any) {
	return [style, extra];
}

export function Card(props: ViewProps) {
	return (
		<MotiView
			from={{ opacity: 0, translateY: 8 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{ type: 'timing', duration: 250 }}
			style={cn({ backgroundColor: '#0f172a', borderRadius: 16, padding: 16 }, props.style)}
			{...props}
		/>
	);
}

export function Title(props: TextProps) {
	return <Text {...props} style={cn({ color: '#fff', fontSize: 18, fontWeight: '600' }, props.style)} />;
}

export function Subtitle(props: TextProps) {
	return <Text {...props} style={cn({ color: '#94a3b8' }, props.style)} />;
}

export function Button(props: TouchableOpacityProps) {
	return <TouchableOpacity activeOpacity={0.8} {...props} style={cn({ backgroundColor: '#6366f1', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 }, props.style)} />;
}

export function ButtonText(props: TextProps) {
	return <Text {...props} style={cn({ color: '#fff', fontWeight: '600' }, props.style)} />;
}