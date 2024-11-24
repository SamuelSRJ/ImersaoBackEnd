// Importa o MongoClient, uma classe usada para conectar ao MongoDB
import { MongoClient } from 'mongodb';

// Função para estabelecer uma conexão com o banco de dados MongoDB
export default async function conectarAoBanco(stringConexao) {
    // Variável para armazenar a instância do cliente MongoDB
    let mongoClient;

    try {
        // Cria um novo cliente MongoDB com a string de conexão fornecida
        mongoClient = new MongoClient(stringConexao);
        console.log('Conectando ao cluster do banco de dados...');
        // Tenta estabelecer a conexão com o banco
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        // Retorna a instância do cliente conectado para ser usada em outras partes do sistema
        return mongoClient;
    } catch (erro) {
        // Em caso de erro, exibe a mensagem no console
        console.error('Falha na conexão com o banco!', erro);
        // Encerra o processo com erro, já que o sistema não pode funcionar sem o banco
        process.exit();
    }
}