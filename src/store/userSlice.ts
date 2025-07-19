import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/user.interface';
import {userService} from "../services/userService";

interface UserState {
    user: IUser | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

export const getMe = createAsyncThunk(
    'user/getMe',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await userService.getMe();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Не вдалося отримати дані користувача');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMe.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

const { reducer: userReducer, actions } = userSlice;

const userActions = {
    ...actions,
    getMe,
};

export {
    userReducer,
    userActions
};
