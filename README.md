# Gerenciador de Tarefas e Eventos (Web 3)

Este é um projeto de um sistema simples para gerenciamento de tarefas e eventos. A aplicação permite criar, visualizar, atualizar e deletar itens em uma agenda.

O frontend foi construído com **Angular** e estilizado com **Bootstrap**, e o backend (API) foi desenvolvido em **Node.js** com **Express**, conectado a um banco de dados **MySQL**.

##  Funcionalidades

* **Listagem de Itens:** Visualize todos os eventos e tarefas em ordem cronológica.
* **Filtro por Data:** Filtre os itens para visualizar a agenda de um dia específico.
* **Criar Item:** Adicione novas tarefas e eventos.
* **Editar Item:** Modifique informações de um item já existente.
* **Marcar como Concluído:** Marque tarefas como finalizadas.
* **Ver todas as Tarefas do Dia:** Visualize todas as tarefas do dia.
* **Excluir Item:** Remova itens da agenda.

##  Tecnologias Utilizadas

* **Frontend:**
    * [Angular](https://angular.io/)
    * [Bootstrap](https://getbootstrap.com/)
* **Backend:**
    * [Node.js](https://nodejs.org/)
    * [Express.js](https://expressjs.com/)
    * [mysql2](https://github.com/sidorares/node-mysql2)
* **Banco de Dados:**
    * [MySQL](https://www.mysql.com/)

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e rodar a aplicação em seu ambiente local.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (que já vem com o npm)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* Um servidor MySQL (como XAMPP, WAMP, ou a instalação padrão do MySQL).

### 1. Configuração do Banco de Dados (MySQL)

Primeiro, crie o banco de dados e a tabela que a aplicação usará.

1.  Acesse seu cliente MySQL.
2.  Crie o banco de dados:
    ```sql
    CREATE DATABASE calendar_db;
    ```
3.  Use o banco de dados recém-criado:
    ```sql
    USE calendar_db;
    ```
4.  Crie a tabela `items` com a seguinte estrutura:
    ```sql
    CREATE TABLE items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NULL,
        completed BOOLEAN DEFAULT 0
    );
    ```

### 2. Configuração do Backend (API Node.js)

Agora, vamos configurar e iniciar o servidor.

1.  Clone o repositório (ou navegue até a pasta do seu backend):
    ```bash
    # Exemplo, se o seu backend estiver na pasta 'api'
    cd pasta-do-backend/
    ```

2.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```

3.  Configure a conexão com o banco de dados. Abra o arquivo principal da API (ex: `index.js` ou `server.js`) e verifique se os dados de conexão estão corretos:
    ```javascript
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',       // Seu usuário do MySQL
      password: '',       // Sua senha do MySQL
      database: 'calendar_db'
    });
    ```

4.  Inicie o servidor da API:
    ```bash
    node index.js
    ```
    O backend estará rodando em `http://localhost:3000`.

### 3. Configuração do Frontend (Angular)

Por fim, configure e inicie a aplicação Angular.

1.  Em um novo terminal, navegue até a pasta do seu frontend:
    ```bash
    # Exemplo, se o seu frontend estiver na pasta 'app'
    cd pasta-do-frontend/
    ```
2.  Instale as dependências do Angular:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    ng serve
    ```
4.  Abra seu navegador e acesse `http://localhost:4200/`. A aplicação deve estar funcionando e se comunicando com a API.

   ## 📄 Apresentação do Projeto

**[Clique aqui para ver a apresentação em PDF](docs/apresentacao.pdf)**
