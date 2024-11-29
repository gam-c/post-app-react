import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPosts } from "./redux/postsSlice";
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts); // Obtener los posts del estado global
    const [filter, setFilter] = useState(""); // Estado local para el filtro
    const [filteredPosts, setFilteredPosts] = useState([]); // Posts filtrados
    const [newPost, setNewPost] = useState({ name: "", description: "" }); // Estado para el nuevo post
    const [error, setError] = useState(null); // Estado para manejar mensajes de error

    // Definir fetchPosts con useCallback
    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/posts");
            dispatch(setPosts(response.data)); // Guardar en Redux
            setFilteredPosts(response.data); // Inicializar los posts filtrados
        } catch (error) {
            console.error("Error al obtener los posts:", error);
            setError(
                "Error al cargar los posts. Intenta nuevamente más tarde."
            );
        }
    }, [dispatch]);

    // useEffect para cargar los posts solo una vez
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // useEffect para filtrar los posts cuando cambia el filtro
    useEffect(() => {
        if (posts.length > 0) {
            const filtered = posts.filter((post) =>
                post.name.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts([]);
        }
    }, [filter, posts]);

    // Función para manejar el cambio en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    // Función para crear un nuevo post
    const handleCreatePost = async (e) => {
        e.preventDefault(); // Evitar recargar la página
        setError(null); // Limpiar errores anteriores
        try {
            await axios.post("http://localhost:5000/api/posts", newPost); // Enviar datos al backend
            setNewPost({ name: "", description: "" }); // Limpiar el formulario
            fetchPosts(); // Actualizar la lista de posts
        } catch (error) {
            console.error("Error al crear el post:", error);
            setError(
                error.response?.data?.error ||
                    "Error al crear el post. Intenta nuevamente."
            );
        }
    };

    // Función para eliminar un post
    const handleDeletePost = async (id) => {
        setError(null); // Limpiar errores anteriores
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`); // Eliminar post en el backend
            fetchPosts(); // Actualizar la lista de posts
        } catch (error) {
            console.error("Error al eliminar el post:", error);
            setError("Error al eliminar el post. Intenta nuevamente.");
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Posts
            </Typography>

            {/* Mostrar mensajes de error */}
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}

            {/* Campo de búsqueda */}
            <Box style={{ marginBottom: "20px" }}>
                <TextField
                    label="Filtro de Nombre"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} // Actualizar el filtro dinámicamente
                    variant="outlined"
                    fullWidth
                />
            </Box>

            {/* Tabla de posts */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Nombre</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Descripción</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Acción</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>{post.name}</TableCell>
                                    <TableCell>{post.description}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() =>
                                                handleDeletePost(post.id)
                                            }
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No hay posts para mostrar
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Formulario para crear un nuevo post */}
            <Box
                component="form"
                onSubmit={handleCreatePost}
                style={{
                    marginTop: "20px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Crear Post
                </Typography>
                <TextField
                    label="Nombre"
                    name="name"
                    value={newPost.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    style={{ marginBottom: "10px" }}
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={newPost.description}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // Prevenir el salto de línea
                            if (
                                newPost.name.trim() &&
                                newPost.description.trim()
                            ) {
                                document
                                    .getElementById("create-post-button")
                                    .click(); // Simular clic en el botón de crear
                            } else {
                                setError(
                                    "Ambos campos son obligatorios para crear el post."
                                );
                            }
                        }
                    }}
                    fullWidth
                    required
                    multiline
                    rows={3}
                    style={{ marginBottom: "10px" }}
                />
                <Button
                    id="create-post-button"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Crear
                </Button>
            </Box>
        </Container>
    );
};

export default PostsList;
