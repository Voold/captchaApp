Для Прода
npm i express dotenv helmet cors rate-limiter-flexible zod winston pg axios @types/axios

# express — веб-сервер (роуты, middleware)
# dotenv — .env файлы (BOT_TOKEN, PORT)
# helmet — HTTP security headers (XSS защита)
# cors — доступ только с фронта (localhost:5173)
# rate-limiter-flexible — DDoS защита (5 req/sec по IP)
# zod — валидация DTO (типизация запросов)
# winston — структурированные логи (JSON в файл/TG)
# pg — PostgreSQL клиент

Для Дева
npm i -D @types/node @types/express typescript ts-node-dev eslint prettier husky tsx

# @types/node — типы для Node.js API (fs, process, http). Без них TS ругается на process.env
# @types/express — типы для Express (Request, Response, NextFunction). req.ip, res.json() типизированы
# typescript — сам компилятор TS. tsc = build
# ts-node-dev — магия разработки: запускает TS без компиляции + авто-релоад при изменениях файлов
# eslint — линтер. Ловит: неиспользуемые переменные, console.log, async/await ошибки
# prettier — авто-форматирование кода (один стиль для всей команды)
# husky — git хуки. git commit → авто-fmt + lint → не закоммитьшь грязный код