import React, {useState, useEffect, FC} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, GestureResponderEvent} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    isErrorWithCode,
    isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {RootStackParamList} from '../navigation/AppNavigator';
import {login, googleLogin} from '../store/authSlice';
import {theme} from '../theme';
import {GoogleOauthEnum} from '../../enums/googleOauth.enum';
import {useAppSelector} from "../hooks/useAppSelector";
import {useAppDispatch} from "../hooks/useAppDispatch";
import api from "../api";
import {urls} from "../constants/urls";


// Налаштування Google Sign-In
GoogleSignin.configure({
    webClientId: GoogleOauthEnum.WEB_CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: false,
});

interface LoginForm {
    email: string;
    password: string;
}

type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

interface AuthScreenProps {
    navigation: AuthScreenNavigationProp;
}

const AuthScreen: FC<AuthScreenProps> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const {loading, error, isAuthenticated} = useAppSelector(state => state.auth);
    const [form, setForm] = useState<LoginForm>({email: '', password: ''});

    useEffect(() => {
        if (isAuthenticated) {
            navigation.replace('Main');
        }
    }, [isAuthenticated, navigation]);

    const handleEmailLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Помилка', 'Будь ласка, заповніть усі поля');
            return;
        }

        try {
            await dispatch(login(form)).unwrap();
        } catch (err) {
            Alert.alert('Помилка входу', error || 'Не вдалося увійти. Перевірте дані.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (isSuccessResponse(response)) {
                const idToken = response.data.idToken;
                console.log('ID_TOKEN: ', idToken);
                if (idToken) {
                    try {
                        const result = await dispatch(googleLogin({id_token: idToken})).unwrap(); // Змінено на id_token
                        console.log('Google Login Success:', result);
                    } catch (err) {
                        console.log('Google Login Error:', err); // Дебаг помилки
                        Alert.alert('Помилка', `Сталася помилка під час входу через Google: ${err}`);
                    }
                } else {
                    Alert.alert('Помилка', 'Не вдалося отримати Google ID токен');
                }
            } else {
                Alert.alert('Помилка', 'Вхід через Google скасовано');
            }
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        Alert.alert('Помилка', 'Вхід уже виконується');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        Alert.alert('Помилка', 'Google Play Services недоступні');
                        break;
                    default:
                        console.log('Google Sign-In Error:', error); // Дебаг помилки
                        Alert.alert('Помилка', 'Невідома помилка Google Sign-In');
                }
            } else {
                console.log('Unexpected Error:', error); // Дебаг неочікуваної помилки
                Alert.alert('Помилка', 'Сталася помилка під час входу через Google');
            }
        }
    };

    const handleForgotPassword = async () => {
        if(!form.email) {
            alert('Введіть email для скидання паролю');
        }
        await api.post(urls.auth.forgotPassword, { email: form.email });
        setTimeout(() => {
            navigation.navigate('ResetPassword');
        },2000)

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вхід</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.forgotButton}
                onPress={handleForgotPassword}
            >
                <Text style={styles.forgotButtonText}>Забув пароль</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleEmailLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Увійти через Email</Text>
            </TouchableOpacity>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={handleGoogleLogin}
                disabled={loading}
                style={styles.googleButton}
            />
            {error && <Text style={styles.error}>Помилка {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.large,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 8,
        padding: theme.spacing.medium,
        marginBottom: theme.spacing.medium,
        fontSize: 16,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.medium,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: theme.spacing.medium,
    },
    forgotButton: {
        // backgroundColor: theme.colors.primary,
        padding: theme.spacing.small,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: theme.spacing.medium,
    },
    googleButton: {
        width: '100%',
        height: 48,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotButtonText: {
        color: '#201b1b',
        fontSize: 16,
        fontWeight: 'bold',
    },
    error: {
        color: theme.colors.error,
        marginTop: theme.spacing.medium,
        textAlign: 'center',
    },
});

export default AuthScreen;
