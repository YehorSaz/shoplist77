import React, {FC} from 'react';
import {NavigationContainer, NavigatorScreenParams} from '@react-navigation/native';
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
import ListScreen from '../screens/ListScreen';

export type HomeStackParamList = {
  Home: undefined;
  ListDetail: { listId: string };
};

export type RootStackParamList = {
    Main: undefined;
    Home: NavigatorScreenParams<HomeStackParamList>;
    Auth: undefined;
    ResetPassword: undefined;
    TestLink: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackScreen = () => (
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <HomeStack.Screen name="ListDetail" component={ListScreen} options={{headerShown: false}}/>
    </HomeStack.Navigator>
);

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, size}) => {
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
        <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown: false}}/>
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
