FROM node:20.14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT=4444
RUN npx prisma generate

# ENV PRISMA_QUERY_ENGINE_LIBRARY="node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node"

RUN npm run build

EXPOSE 4444

CMD ["/app/run.sh"]
