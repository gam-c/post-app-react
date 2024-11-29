const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Ruta GET para verificar que funciona
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
});

// Ruta POST para crear un nuevo post con validaciones
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    // Validaciones básicas
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'El campo "name" es obligatorio.' });
    }
    if (!description || description.trim() === '') {
        return res.status(400).json({ error: 'El campo "description" es obligatorio.' });
    }

    try {
        const newPost = await Post.create({ name, description });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ error: 'Error al crear el post' });
    }
});

// Ruta DELETE para eliminar un post
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado.' });
        }
        await post.destroy();
        res.status(200).json({ message: 'Post eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el post:', error);
        res.status(500).json({ error: 'Error al eliminar el post' });
    }
});

module.exports = router;
