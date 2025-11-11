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