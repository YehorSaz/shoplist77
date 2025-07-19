import * as SecureStore from 'expo-secure-store';

const saveAuthToken = async (token: string) => {
    await SecureStore.setItemAsync('authToken', token);
};

const getAuthToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('authToken');
};

const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
};

const saveRefreshToken = async (token: string) => {
    await SecureStore.setItemAsync('refreshToken', token);
};

const getRefreshToken = async () => {
    return await SecureStore.getItemAsync('refreshToken');
};

const removeRefreshToken = async () => {
    await SecureStore.deleteItemAsync('refreshToken');
};

const logout = async () => {
    await removeAuthToken();
    await removeRefreshToken();
}

export const secureStoreUtils = {
    saveAuthToken,
    getAuthToken,
    removeAuthToken,
    getRefreshToken,
    removeRefreshToken,
    saveRefreshToken,
    logout
}
