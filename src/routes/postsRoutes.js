// Importa o framework Express para criação do servidor
import express from "express";
// Importa o multer, uma biblioteca para manipulação de uploads de arquivos
import multer from "multer";
import cors from "cors";
// Importa as funções controladoras relacionadas a posts
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controller/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o multer para armazenar os arquivos enviados na pasta "uploads"
const upload = multer({dest:"./uploads"});

// Define as rotas do aplicativo
const routes = (app) => {
    // Middleware para permitir o parsing de requisições com JSON no corpo
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota para obter todos os posts (GET na rota "/posts")
    app.get("/posts", listarPosts);
    // Rota para criar um novo post (POST na rota "/posts")
    app.post("/posts", postarNovoPost);
    // Rota para fazer upload de uma imagem e criar um post associado (POST na rota "/upload")
    // O multer processa o arquivo enviado no campo "imagem" do formulário
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
};

// Exporta as rotas para que possam ser usadas em outros arquivos
export default routes;
