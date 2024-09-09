# Usa una imagen de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias (incluye devDependencies para el build)
RUN npm install --only=production

# Copia todo el código de la aplicación
COPY . .

# Construye el proyecto
RUN npm run build

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "start"]
