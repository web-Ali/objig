FROM node:16-alpine as builder

WORKDIR /usr/app

COPY package.json package-lock.json /usr/app/
RUN npm install
COPY .eslintrc.cjs /usr/app/
COPY index.html /usr/app/
COPY svg.d.ts /usr/app/
COPY tailwind.config.js /usr/app/
COPY tsconfig.json /usr/app/
COPY tsconfig.node.json /usr/app/
COPY postcss.config.cjs /usr/app/
COPY vite.config.ts /usr/app/
COPY public/ /usr/app/public/
COPY src/ /usr/app/src/

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]