# Concurso Gastronômico API

API para um sistema de concurso gastronômico, desenvolvida como projeto acadêmico, que permite o cadastro de restaurantes e o envio de avaliações dos pratos pelos usuários. O foco do projeto é impulsionar a gastronomia local, promovendo os restaurantes da região por meio das avaliações e do engajamento dos usuários.

# Principais funcionalidades

- Registro e autenticação de usuários
- Registro e autenticação de restaurantes
- Cadastro e consulta de pratos
- Avaliação de pratos com notas

## Tecnologias utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **Docker**
- **Zod**
- **Multer**
- **JWT (JSON Web Token)**
- **Jest & Supertest**
- **Swagger**
- **GitHub Actions**
- **ESLint & Prettier**
- **Husky & lint-staged**

## Conceitos utilizados

- **Princípios SOLID**
- **Injeção de dependências**
- **Design Patterns:**
    - Repository Pattern
    - Factory Pattern
    - Adapter Pattern

## Entidades

```ts
User {
  id         String   @id @default(uuid())
  first_name String   @db.VarChar(50)
  last_name  String   @db.VarChar(50)
  email      String   @unique @db.VarChar(100)
  password   String   @db.VarChar(100)
  reviews    Review[]
}
```

```ts
Restaurant {
  id        String @id @default(uuid())
  cnpj      String @unique @db.VarChar(50)
  name      String @db.VarChar(100)
  password  String @db.VarChar(100)
  image_url String
  dishes    Dish[]
}
```

```ts
Dish {
  id            String     @id @default(uuid())
  name          String     @db.VarChar(100)
  details       String     @db.VarChar(255)
  price         Decimal    @db.Decimal(5, 2)
  restaurant_id String
  image_url     String
  restaurant    Restaurant @relation(fields: [restaurant_id], references: [id])
  reviews       Review[]
}
```

```ts
Review {
  id      String  @id @default(uuid())
  user_id String
  dish_id String
  rating  Int
  comment String? @db.VarChar(500)
  user    User    @relation(fields: [user_id], references: [id])
  dish    Dish    @relation(fields: [dish_id], references: [id])
}
```

## Rodando a aplicação

O primeiro passo é subir o PostgresSQL rodando `docker-compose up -d` na pasta raíz do projeto. Depois:

```bash

# Instale as dependências
npm install

# Rode a aplicação
npm run start
```

## Autenticação

A autenticação é baseada em **JWT**.

**Access Token**: token de curta duração enviado no cabeçalho da requisição HTTP Authorization no formato Bearer <token>. Usado para autenticar e autorizar o acesso às rotas protegidas.

**Refresh Token**: token de longa duração utilizado para obter um novo Access Token quando este expira, garantindo uma experiência de uso contínua sem necessidade de novo login.

## Deploy

A aplicação está configurada com pipeline de **CI/CD** para garantir deploys automáticos e seguros a cada atualização no repositório. O deploy está hospedado na plataforma **Render**, que gerencia a infraestrutura e mantém a aplicação disponível online 24/7, podendo ser acessada em: **https://concurso-gastronomico-api.onrender.com/**

## Testes automatizados

A aplicação conta tanto com **testes de integração** quanto com **testes e2e**, testando as principais funcionalidades do sistema e alcançando uma cobertura de mais de **90%**.

Para rodar os testes, basta utilizar o comando `npm run test`

![Image](https://github.com/user-attachments/assets/9992cc18-71dc-49df-b1a1-cf204fb5f75e)

## Documentação com Swagger

A documentação completa da API pode ser acessada em `https://concurso-gastronomico-api.onrender.com/docs`

![Image](https://github.com/user-attachments/assets/54f3dd62-1f4c-4263-92da-4d0b71766867)
