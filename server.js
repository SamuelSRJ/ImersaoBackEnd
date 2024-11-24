// Importa o framework Express para criação do servidor
import express from "express";
// Importa as rotas definidas no arquivo "postsRoutes.js"
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.static("uploads"))

// Configura as rotas no aplicativo, passando o objeto "app" como parâmetro
routes(app);

// Inicia o servidor na porta 3000 e define um callback para exibir uma mensagem no console
app.listen(3000, () => {
    console.log('Servidor está escutando...'); // Mensagem indicando que o servidor está ativo
});
