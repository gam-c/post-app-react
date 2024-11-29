import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';

// Configurar el store de Redux
const store = configureStore({
    reducer: {
        posts: postsReducer, // Reducer para manejar los posts
    },
});

export default store;
