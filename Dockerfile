# копируем образ для начальной сбоки
FROM node:22-alpine AS builder
# сздаём рабочую дирректорию (по дефолту app)
WORKDIR /app
# копируем файл с зависимостями
COPY package*.json ./
# инсталим зависимости
RUN npm ci
# копируем файлы проекта
COPY . .
# делаем билд
RUN npm run build


# финальная сборка, копируем образ nginx:alpine
FROM nginx:alpine
# берём с образа начальной сборки файл билда, заменяем им 
# содержимое из переданного пути
COPY --from=builder /app/dist /usr/share/nginx/html
# копируем локальный nginx.conf и заменяем
# стандартный default.conf в контейнере
COPY nginx.conf /etc/nginx/conf.d/default.conf
# открываем порт
EXPOSE 80
# обязательная команда для запуска nginx, 
# daemon off служит как оповещение что nginx 
# должен быть не в фоне, а всегда переднем плане
CMD ["nginx", "-g", "daemon off;"]
