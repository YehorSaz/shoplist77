import 'react-native-gesture-handler';
import React, {FC, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {authActions} from './store/authSlice';
import AppNavigator from './navigation/AppNavigator';
import {useAppDispatch} from "./hooks/useAppDispatch";
import {setupInterceptors} from "./api/setupInterceptors";

setupInterceptors();

const AppWrapper: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authActions.checkAuth());
    }, [dispatch]);

    return <AppNavigator/>;
};

export default function App() {
    return (
        <Provider store={store}>
            <AppWrapper/>
        </Provider>
    );
}
