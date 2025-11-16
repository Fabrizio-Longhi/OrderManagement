# Dockerfile para Backend (OrderManagement/backend/Dockerfile)

FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar prisma schema
COPY prisma ./prisma/

# Copiar el resto del código
COPY . .

# Generar el cliente de Prisma DESPUÉS de copiar todo
RUN npx prisma generate

# Exponer el puerto
EXPOSE 4000

# Script de inicio que ejecuta migraciones y luego inicia el servidor
CMD ["sh", "-c", "npx prisma generate && npx prisma db push --skip-generate && npm run dev"]