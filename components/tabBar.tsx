import { View, TouchableHighlight, StyleSheet, Text } from 'react-native'
import React from 'react'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { primaryColor, routes } from '@/constants';
import { icontype } from '@/types';

export default function TabBar({ state, navigation, descriptors }: BottomTabBarProps) {
    return (
        <View style={styles.tabbar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                const icons = {
                    list: "list-outline",
                    uploader: "document-text-outline",
                    scan: "camera-outline"
                }

                const icon = icons[route.name as keyof typeof icons] as keyof typeof Ionicons.glyphMap;

                return (
                    <TouchableHighlight
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        activeOpacity={1}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        underlayColor={'none'} // for turning off outline
                        style={{
                            flex: 1,
                        }}>
                        <View className='flex items-center'>
                            <Ionicons name={isFocused ? icon.split('-outline')[0] as icontype : icon} size={28} color={isFocused ? primaryColor : '#686868'} />
                            <Text className={`${isFocused ? 'font-medium text-[#4493f8]' : 'text-[#686868] font-normal'} text-sm`}>{routes.filter(r => r.name == route.name)[0].title}</Text>
                        </View>
                    </TouchableHighlight>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 25,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        paddingHorizontal: 5,
        paddingVertical: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    }
})