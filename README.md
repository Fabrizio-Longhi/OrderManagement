
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
- npm
- Docker Desktop instalado
- Docker Compose instalado (viene incluido con Docker Desktop)

## Iniciar proyecto con Docker

1) Por primera vez correr: `docker compose up --build`
2) Una vez inicializado correr: `docker compose up`

- Detener servicios: `docker compose down`
- Detener y eliminar volumenes y BD: `docker compose down -v`

## 🧩 Configuración inicial

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Fabrizio-Longhi/OrderManagement
cd OrderManagement/backend
```

### 2️⃣ Correr sin docker

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

## 🧰 Scripts útiles

```bash
Comando                    Descripción
npm run dev                Inicia el servidor de desarrollo
npm run test               Ejecuta los tests con Jest
npm run db:push:test       Sincroniza el esquema en la base de datos de testing
npm run studio:dev         Abre Prisma Studio para la base de datos de desarrollo
npm run studio:test        Abre Prisma Studio para la base de datos de testeo
```

## Estructura frontend

```bashfrontend/
├─ src/
│  ├─ api/               # funciones para llamar al backend (fetch o axios)
│  ├─ components/        # componentes reutilizables
│  ├─ pages/             # páginas: Login, Products, Orders, etc.
│  ├─ hooks/             # hooks personalizados (opcional)
│  ├─ context/           # contexto global (para auth, por ejemplo)
│  ├─ types/             # tipos TS compartidos (Product, Order, etc.)
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
└─ tsconfig.json
```

## Ejecutar el frontend

`npm run dev`

# Uso de IA

## Herramientas usada

Utilice dos IA's. Para el diseño del Frontend utilice v0, es la IA de Vercel, con la cual fui ajustando el diseño segun me gustara. Y para código utilice Claude, a mi percepcion es la mejor IA para código.

## Que partes del código genere y mejore con IA

Utilice Claude para lograr correctamente un conjunto de test en el Backend. Nunca habia utilizado el ORM Prisma, por lo tanto me dijo perfectamente que debia hacer para poder realizar una correcta integracion.
Ademas me ayudo mucho en el front para poder lograr el diseño correcto que yo queria. React es una tecnologia que utilice hace mucho tiempo asique me apoye mucho en la IA para poder recordar mis conocimientos adquiridos en su momento.

## Que ajustes hice manualmente

Si bien la IA me ayudo mucho con el diseño de la App, muchas veces me respondia de forma incorrecta, por lo tanto tuve que ajustar manualmente ciertas cuestiones de diseño.
En los test, se confundia mucho, ponia rutas invalidas, test erroneos, entonces tuve que realizarle algunos cambios especificos.
