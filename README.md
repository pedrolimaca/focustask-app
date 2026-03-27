# FocusTask 

Sistema Full-Stack de gestão de tarefas (To-Do List).

## Tecnologias Usadas
- **Frontend:** React.js.
- **Backend:** Node.js.
- **Base de Dados:** MySQL.

## Funcionalidades
- Adicionar, remover e atualizar tarefas.
- Marcar tarefas como concluídas ou reabrir.
- Filtrar por status e prioridade.
- Barra de pesquisa para procurar tarefas por nome.

---

## Como Executar o Projeto

### 1. Banco de Dados
Crie um banco de dados no seu MySQL chamado `focustask_db`. Em seguida, execute o script contido no arquivo `database.sql` para criar a tabela necessária e inserir os dados iniciais.

### 2. Configurando e rodando o Backend
1. Abra o terminal e acesse a pasta `backend`.
2. Crie um arquivo `.env` na raiz da pasta backend com as credenciais do seu banco de dados:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=focustask_db
   PORT=5000
   ```
3. Instale as dependências executando o comando:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### 3. Configurando e rodando o Frontend
1. Abra um novo terminal e acesse a pasta `frontend`.
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Inicie a aplicação web:
   ```bash
   npm start
   ```
4. A aplicação será aberta automaticamente no seu navegador no endereço: `http://localhost:3000`
