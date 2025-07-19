import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import {secureStoreUtils} from "../utils/secureStore";
import {urls} from "../constants/urls";

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

interface LoginCredentials {
    email: string;
    password: string;
}

interface GoogleLoginCredentials {
    id_token: string; // Збігається з очікуваним ключем бекенду
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post(urls.auth.signIn, credentials);
            const token = response.data.tokens.accessToken;
            await secureStoreUtils.saveAuthToken(token);
            return token;
        } catch (error: any) {
            console.log('Backend Error (Login):', error.response?.data);
            return rejectWithValue(error.response?.data?.message || 'Не вдалося увійти');
        }
    }
);

export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (credentials: GoogleLoginCredentials, { rejectWithValue }) => {
        try {
            const response = await api.post(urls.auth.googleLogin, { id_token: credentials.id_token });// Використовуємо id_token
            const token = response.data.tokens.accessToken;
            console.log("responce token ", token);
            await secureStoreUtils.saveAuthToken(token);
            return token;
        } catch (error: any) {
            console.log('Backend Error (Google Login):', error.response?.data);
            return rejectWithValue(error.response?.data?.message || 'Не вдалося увійти через Google');
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const token = await secureStoreUtils.getAuthToken();
            if (token) {
                    return token;
            }
            return rejectWithValue('No valid token found');
        } catch (error: any) {
            return rejectWithValue('Token verification failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(googleLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

const { reducer: authReducer, actions } = authSlice;
const authActions = {
    ...actions,
    login,
    googleLogin,
    checkAuth,
}

export {
    authReducer,
    authActions,
}
