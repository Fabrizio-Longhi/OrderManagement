# OrderManagement

## Correr Backend

1) npm run dev
2) `http://localhost:3000/api/health`

Ver base de datos

`sudo -u postgres psql -d order_management`

`npx prisma studio`

Para migraciones
`npx prisma migrate dev --name add_user_model`

Actualizar prisma

`npx prisma generate`

Para actualizar modelos de Prisma:
`npm run db:push:test`

Para ver cada base de datos
`npm run studio:dev`   # abre order_management
`npm run studio:test`  # abre order_management_test

Por hacer:
1) middlware de products

# 🧾 Order Management API

API REST para la gestión de usuarios, productos y clientes.  
Desarrollada en **TypeScript**, utilizando **Express**, **Prisma ORM**, **PostgreSQL** y **Jest + Supertest** para testing.  
Forma parte de una prueba técnica de backend.

---

## 🚀 Tecnologías utilizadas

- **Node.js + Express** — servidor backend  
- **TypeScript** — tipado estático  
- **Prisma ORM** — conexión y manipulación de base de datos  
- **PostgreSQL** — base de datos relacional  
- **Jest + Supertest** — pruebas automáticas  
- **Dotenv** — manejo de variables de entorno  

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- [Node.js 18+](https://nodejs.org/en/)
- [PostgreSQL 14+](https://www.postgresql.org/download/)
- npm o yarn

---

## 🧩 Configuración inicial

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/fabriziolonghi/OrderManagement.git
cd OrderManagement/backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Crear las bases de datos
Entrá a PostgreSQL (por ejemplo, con psql -U postgres) y ejecutá:

```bash
CREATE DATABASE order_management;
CREATE DATABASE order_management_test;
```

### 4️⃣ Configurar variables de entorno

Creá dos archivos: .env y .env.test en la carpeta backend/.

```bash
PORT=4000
DATABASE_URL="postgresql://postgres:tu_password@localhost:5433/order_management?schema=public"
JWT_SECRET="coloca_un_token_seguro_aqui"
```

```bash
PORT=4000
DATABASE_URL="postgresql://postgres:tu_password@localhost:5433/order_management_test?schema=public"
JWT_SECRET="coloca_un_token_seguro_aqui"
```

### 5️⃣ Crear el esquema de base de datos

```bash
npx prisma db push
```

Para la base de datos de testing:

```bash
npm run db:push:test
```

### 6️⃣ Iniciar el servidor

```bash
npm run dev
```

Aqui: `http://localhost:4000`

## Tests automatizados
El proyecto incluye pruebas con Jest + Supertest.

Para ejecutarlas:

```bash
npm run test
```
