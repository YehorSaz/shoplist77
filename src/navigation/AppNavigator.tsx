import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import {navigationRef} from './RootNavigation';
import {ProfileScreen} from "../screens/ProfileScreen";
import {Ionicons} from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import {useAppSelector} from "../hooks/useAppSelector";
import {ResetPasswordScreen} from "../screens/ResetPasswordScreen";

export type RootStackParamList = {
    Main: undefined;
    ListDetail: { listId: string };
    Auth: undefined;
    ResetPassword: undefined;
    TestLink: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
                if (route.name === 'Home') {
                    return (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={'black'}
                        />
                    );
                } else if (route.name === 'Profile') {
                    return (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={'black'}
                        />
                    );
                }
            },
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
    </Tab.Navigator>
);

const AppNavigator: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.auth)

    const prefix = Linking.createURL('/');

    const linking = {
        prefixes: [prefix, 'shoplist77://'],
        config: {
            screens: {
                ResetPassword: 'reset-password',
            },
        },
    };

    return (
        <NavigationContainer
            linking={linking}
            ref={navigationRef}
        >
            <Stack.Navigator>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Main" component={MainTabs} options={{headerShown: false}}/>
                    </>
                ) : (
                    <Stack.Screen name="Auth" component={AuthScreen} options={{headerShown: false}}/>
                )}
                <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
        ;
};

export default AppNavigator;
