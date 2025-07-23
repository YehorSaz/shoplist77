import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
} from 'react-native';
import { urls } from '../constants/urls';
import api from "../api";

export const ResetPasswordScreen: React.FC = () => {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!token || !password) {
            Alert.alert('Помилка', 'Введіть токен і новий пароль');
            return;
        }

        setLoading(true);
        try {
            await api.put(urls.auth.forgotPasswordSet+token, {password});

            Alert.alert('Успіх', 'Пароль успішно змінено');
            setToken('');
            setPassword('');
        } catch (error: any) {
            console.error(error);
            Alert.alert('Помилка', error?.response?.data?.message || 'Щось пішло не так');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Скидання пароля</Text>

            <Text style={styles.label}>Token (із email)</Text>
            <TextInput
                style={styles.input}
                placeholder="Вставте токен"
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Новий пароль</Text>
            <TextInput
                style={styles.input}
                placeholder="Новий пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title={loading ? 'Зачекайте...' : 'Змінити пароль'} onPress={handleResetPassword} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        marginTop: 12,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 8,
    },
});
