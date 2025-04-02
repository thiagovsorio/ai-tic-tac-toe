# Game API

AI-powered Tic-Tac-Toe game with a NestJS backend and PostgreSQL.

## Guide

```bash
# TO SETUP
cp .env.example .env

## FILL THE OPENAI_API_KEY ON THE .env

npm install
docker compose up db -d
sleep 5
npx prisma migrate dev --name starting_db
npx prisma generate

# TO RUN
npm run start

# TO TEST
npm run test
```
## API Documentation
While the app is running, open:
```
http://localhost:3033/api
```
Swagger UI will be available there.