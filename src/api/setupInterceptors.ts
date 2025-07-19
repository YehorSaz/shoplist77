import api from "./index";
import {secureStoreUtils} from "../utils/secureStore";
import {urls} from "../constants/urls";
import store from "../store";
import {authActions} from "../store/authSlice";

export const setupInterceptors = () => {
    // Interceptor для додавання токена
    api.interceptors.request.use(async (config) => {
        const token = await secureStoreUtils.getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

// Interceptor для обробки помилок
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                const refreshToken = await secureStoreUtils.getRefreshToken();
                if (refreshToken) {
                    try {
                        const refreshResponse = await api.post(
                            urls.auth.refresh,
                            {},
                            {
                                headers: { Authorization: `Bearer ${refreshToken}` },
                            }
                        );
                        const newAccessToken = refreshResponse.data?.accessToken;
                        if (newAccessToken) {
                            await secureStoreUtils.saveAuthToken(newAccessToken);
                            // Повторити оригінальний запит з новим токеном
                            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                            return api.request(error.config);
                        }
                    } catch (refreshError) {
                        // Якщо рефреш не вдався — видалити токени
                        await secureStoreUtils.logout()
                        store.dispatch(authActions.logout()); // Викликати logout для оновлення стану
                    }
                } else {
                    // Якщо немає refreshToken — видалити токени
                    await secureStoreUtils.logout();
                    store.dispatch(authActions.logout());
                }
            }
            return Promise.reject(error);
        }
    );
}
