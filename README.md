## Test graphql task
# Техническое задание по Node.js

### Medium Lite

**Написать простой бекенд-аналог популярного сервиса Medium**

Сущности в проекте:
```
enum UserRole {
  admin = "admin",
  user = "user"
}

interface User {
  id: number;
  name: string;
  email: string;// unique
  password: string;
  role: UserRole;
  posts: Post[];
  viewedPosts: Post[];
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: User;
  viewers: User[];
}
```
**Возможности бекенда:**

- [x] Авторизация (access token + refresh token)
- [x] Создание юзеров (Только админ)
- [x] Получить список юзеров (Только админ) + пагинация через оффсеты
- [x] Получить одного юзера (Только админ)
- [x] Создание постов (Админ и юзер)
- [x] Получить список постов (Админ и юзер) + пагинация через курсоры
- [x] Получить один пост (Админ и юзер) (при запрашивании записать его вьювером)

**Каждый запрос подразумевает валидацию передаваемых параметров, обработку ошибок и понятный ответ в случае ошибок**

**Обязательный технический стек:**

- [x] Фреймворк NestJS
- [x] База данных: PostgreSQL с PrismaJS
- [x] API: GraphQL (Code-first)
- [x] Обернуть весь проект в Docker
- [ ] Будет плюсом если покрыть юнит тестами модуль Post

## Installation locally

```bash
$ npm install
```

## Running the postgres docker-container

```bash
# go postgres folder
cd postgres
# run postgres docker
$ start:docker
# or
$ docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
