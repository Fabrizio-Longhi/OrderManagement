
# 🧾 Order Management

Aplicacion de gestión de usuarios, productos y clientes. Forma parte de una prueba técnica para Futura HAUS


## 🚀 Tecnologías utilizadas

- **Node.js + Express** — servidor backend  
- **React + Vite** — Frontend
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
- Docker Compose instalado

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/Fabrizio-Longhi/OrderManagement
```

## Iniciar proyecto con Docker

1) Por primera vez correr: `docker compose up --build`

- Detener servicios: `docker compose down`
- Detener y eliminar volumenes y BD: `docker compose down -v`

## Tests automatizados

El proyecto incluye pruebas con Jest + Supertest.

Para ejecutarlas:

### Asegurar de que los contenedores estén corriendo

`docker compose up -d`

### Ejecutar los tests

`docker compose exec backend npm test`

### Ver base de datos

`docker-compose exec backend npx prisma studio`

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

## Estructura Backend

```bash
backend/
│
├── src/
│   ├── index.ts         # punto de entrada del servidor
│   ├── app.ts           # configuración de Express
│   ├── routes/          # rutas (auth, products, etc.)
│   ├── controllers/     # lógica de cada endpoint
│   └── middlewares/     # middlewares (auth, errors, etc.)
│
│── test/                # Testing
├── package.json
├── tsconfig.json
```

# Uso de IA

## Herramientas usada

Utilice dos IA's. Para el diseño del Frontend utilice v0, es la IA de Vercel, con la cual fui ajustando el diseño segun me gustara. Y para código utilice Claude, a mi percepcion es la mejor IA para código.

## Que partes del código genero y mejore con IA

Utilice Claude para lograr correctamente un conjunto de test en el Backend. Nunca habia utilizado el ORM Prisma, por lo tanto me dijo perfectamente que debia hacer para poder realizar una correcta integracion.
Ademas me ayudo mucho en el front para poder lograr el diseño correcto que yo queria. React es una tecnologia que utilice hace mucho tiempo asique me apoye mucho en la IA para poder recordar mis conocimientos adquiridos en su momento. Por ultimo me ayudo a que la aplicacion utilice Docker.

## Que ajustes hice manualmente

Si bien la IA me ayudo mucho con el diseño de la App, muchas veces me respondia de forma incorrecta, por lo tanto tuve que ajustar manualmente ciertas cuestiones de diseño.
En los test, se confundia mucho, ponia rutas invalidas, test erroneos, entonces tuve que realizarle algunos cambios especificos.
