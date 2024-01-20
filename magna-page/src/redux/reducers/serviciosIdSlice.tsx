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

const serviciosIdSlice = createSlice({
    name: 'serviciosId',
    initialState,
    reducers: {
        setServiciosId: (state, action: PayloadAction<any>) => {
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

export const { setServiciosId, setLoading, setError } = serviciosIdSlice.actions;

export const selectServiciosId = (state: RootState) => state.serviciosId.data;
export const selectLoading = (state: RootState) => state.serviciosId.loading;
export const selectError = (state: RootState) => state.serviciosId.error;

export default serviciosIdSlice.reducer;
