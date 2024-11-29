import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
    posts: [], // Almacenará todos los posts
};

// Crear el slice para manejar los posts
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload; // Actualizar el estado con los posts obtenidos del backend
        },
    },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
