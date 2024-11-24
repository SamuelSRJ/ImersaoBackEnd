// Importa as funções "getTodosPosts" e "criarPost" do arquivo "postsModel.js"
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
// Importa o módulo "fs" para manipulação de arquivos no sistema
import fs from "fs";

import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res) {
    // Chama a função para buscar todos os posts do modelo
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) contendo os posts no formato JSON
    res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
    // Obtém o conteúdo do novo post enviado no corpo da requisição
    const novoPost = req.body;
    try {
        // Chama a função para salvar o novo post no modelo
        const postCriado = await criarPost(novoPost);
        // Envia uma resposta HTTP com status 200 (OK) contendo o post recém-criado no formato JSON
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Exibe o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro no Servidor) e uma mensagem de erro no formato JSON
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

// Função para fazer upload de uma imagem e criar um post associado a ela
export async function uploadImagem(req, res) {
    // Cria um objeto para o novo post com os dados da imagem enviada
    const novoPost = {
        descricao: "", // A descrição do post (vazia neste caso)
        imgUrl: req.file.originalname, // Nome original do arquivo enviado
        alt: "" // Texto alternativo para a imagem (vazio neste caso)
    };

    try {
        // Chama a função para salvar o post no modelo
        const postCriado = await criarPost(novoPost);
        // Define o novo caminho da imagem com base no ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        // Renomeia o arquivo enviado para o caminho definido
        fs.renameSync(req.file.path, imagemAtualizada);
        // Envia uma resposta HTTP com status 200 (OK) contendo o post recém-criado no formato JSON
        res.status(200).json(postCriado);  
    } catch(erro) {
        // Exibe o erro no console para depuração
        console.error(erro.message);
        // Envia uma resposta HTTP com status 500 (Erro no Servidor) e uma mensagem de erro no formato JSON
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }   
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}