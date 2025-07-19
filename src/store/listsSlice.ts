import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import {IList} from "../interfaces/list.interface";

interface ListsState {
    lists: IList[];
    loading: boolean;
    error: string | null;
}

const initialState: ListsState = {
    lists: [],
    loading: false,
    error: null,
};

export const fetchLists = createAsyncThunk('lists/fetchLists', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/lists');
        return response.data as IList[];
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch lists');
    }
});

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.loading = false;
                state.lists = action.payload;
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

const { reducer: listsReducer, actions } = listsSlice;

const listsActions = {
    ...actions,
    fetchLists,
}

export {
    listsReducer, listsActions
};
