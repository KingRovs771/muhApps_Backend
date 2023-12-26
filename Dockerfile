FROM node:21-alpine
WORKDIR /app 
ENV PORT 50000
COPY . .
RUN npm install 
EXPOSE 50000
CMD ["npm", "run", "dev"]