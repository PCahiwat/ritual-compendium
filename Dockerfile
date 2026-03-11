# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_BASE_URL
ARG VITE_AUTH_CALLBACK_URL
ARG VITE_TENANT_ID
ARG VITE_SUBSCRIPTION_KEY
ARG VITE_WALLET_CONNECT_ID
ARG VITE_DEFAULT_CHAIN_ID
ARG VITE_PASSPORT_BETA
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
ENV PORT=80
CMD ["sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
