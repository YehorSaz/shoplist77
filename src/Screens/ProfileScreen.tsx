import {StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from "react-native";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {userActions} from "../store/userSlice";
import {useEffect} from "react";
import {secureStoreUtils} from '../utils/secureStore';
import {authActions} from "../store/authSlice";

export const ProfileScreen = () => {
    const dispatch = useAppDispatch();

    const { user, loading, error } = useAppSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            dispatch(userActions.getMe());
        }
    }, [dispatch, user]);

    const handleLogout = async () => {
        await secureStoreUtils.logout();
        dispatch(authActions.logout());
    };

    if (loading) {
        return (
            <View style={styles.wrapper}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.wrapper}>
                <Text style={{color: 'red'}}>Помилка: {error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.wrapper}>
            <Text>ProfileScreen</Text>
            {user && (
                <View>
                    <Text>Ім'я: {user.name}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
            )}
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
});
