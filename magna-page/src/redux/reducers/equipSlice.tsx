import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Equipos } from '../../types/types';

export interface EquiposState {
    data: Equipos[] | null;
    loading: boolean;
    error: string | null;
}   

const initialState: EquiposState = {
    data: null,
    loading: false,
    error: null,
};

const equiposSlice = createSlice({
    name: 'equipos',
    initialState,
    reducers: {
        setEquipos: (state, action: PayloadAction<Equipos[]>) => {
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

export const { setEquipos, setLoading, setError } = equiposSlice.actions;
export default equiposSlice.reducer;