import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { RootInterface } from '../../types/types';

export interface ServiciosIdState {
    data: any;
    loading: boolean;
    error: string | null;
}

export type data = RootInterface;

const initialState: ServiciosIdState = {
    data: null,
    loading: false,
    error: null,
};

const projectSlice = createSlice({
    name: 'serviciosId',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { setProject, setLoading, setError } = projectSlice.actions;

export const selectproject = (state: RootState) => state.serviciosId.data;
export const selectLoading = (state: RootState) => state.serviciosId.loading;
export const selectError = (state: RootState) => state.serviciosId.error;

export default projectSlice.reducer;
