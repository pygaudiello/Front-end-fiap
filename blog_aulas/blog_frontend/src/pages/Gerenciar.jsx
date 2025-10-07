import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Gerenciar() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPosts() {
        try {
            const res = await api.get("/posts");
            setPosts(res.data);
        } catch (err) {
            console.error("Erro ao buscar aulas:", err);
        }
        }
        fetchPosts();
    }, []);

    return (
        <div>
        <h1>Gerenciar Aulas</h1>
        {posts.length === 0 && <p>Nenhuma aula encontrada.</p>}
        {posts.map((p) => (
            <div
            key={p.id}
            style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "8px",
            }}
            >
            <h3>{p.title}</h3>
            <p><strong>Autor:</strong> {p.author}</p>
            <Link to={`/edit/${p.id}`}>
                <button style={{ marginRight: "10px" }}>Editar</button>
            </Link>
            </div>
        ))}
        </div>
    );
}
