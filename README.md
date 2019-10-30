# API do gympoint
App gerenciador de academia (Projeto de Conclusão de Curso)

### Um pouco sobre as ferramentas

Você deverá criar a aplicação do zero utilizando o [Express](https://expressjs.com/), além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

#### 1. Autenticação

Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

#### 2. Cadastro de alunos

Permita que alunos sejam mantidos (cadastrados/atualizados) na aplicação utilizando nome, email, idade, peso e altura.

O cadastro de alunos só pode ser feito por administradores autenticados na aplicação.

O aluno não pode se autenticar no sistema, ou seja, não possui senha.

#### 3. Gestão dos Planos

Permita que o usuário administradores possam cadastrar planos para matrícula de alunos;

Crie alguns planos de exemplo:

- Start: Plano de 1 mês por R$129;
- Gold: Plano de 3 meses por R$109/mês;
- Diamond: Plano de 6 meses por R$89/mês;

#### 4. Gestão de Matricula

Nessa funcionalidade é criado um cadastro de matrículas por aluno, a matrícula possui os campos:
- Matricula
- Plano
- Dia de Inicio
- Dia de Fim
- Preço

A data de início da matrícula é escolhida pelo usuário.

A data de término e preço da matrícula deve ser calculada com base no plano selecionado.

Quando um aluno realiza uma matrícula ele recebe um e-mail com detalhes da sua inscrição na academia como plano, data de término, valor e uma mensagem de boas-vidas.

## Instalação do Projeto

- Faça um clone desse repositório;
- Entre na pasta rodando cd gympoint;
- Rode yarn para instalar as dependências;
- Crie um banco de dados no postgres com o nome de gym;
- Altere as credencias dentro de /src/app/config/database.js;
- Rode yarn sequelize db:migrate para executar as migrations;
- Rode yarn sequelize db:seed:all para executar os seeds
- Rode yarn dev para iniciar o servidor.
