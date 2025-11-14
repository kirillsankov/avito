import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Theme, ThemeState } from '../../types/theme';

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }
    return 'light';
};

const initialState: ThemeState = {
    theme: getInitialTheme(),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.theme);
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

