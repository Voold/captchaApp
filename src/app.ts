import { solveCaptcha } from "./controllers/captchaController";

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express()

// JSON parse (for POST /captcha)
app.use(express.json({ limit: '10mb' })); // photos base64

//Helmet (security headers)
import helmet from 'helmet';
app.use(helmet()); // Защита от XSS, clickjacking


// TODO: корсы подкинуть когда будет фронт
// CORS (for front)
/* import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',  // FIXME: Vite dev порт, не прод
  credentials: true
})); */

//Rate limiting (req per sec over IP)
import { RateLimiterMemory } from 'rate-limiter-flexible';
const rateLimiter = new RateLimiterMemory({
  points: Number(process.env.RATE_LIMIT_POINTS) || 10,
  duration: Number(process.env.RATE_LIMIT_DURATION) || 60,
  execEvenly: false,
});

app.use((req, res, next) => {
  let clientIp = req.ip || 'unknown';

  // ::1/::ffff: -> 127.0.0.1 если с локалки
  if (clientIp === '::1' || clientIp?.startsWith('::ffff:')) {
    clientIp = '127.0.0.1';
  }

  /* console.log(`CHECK IP: ${clientIp} | Method: ${req.method} | Path: ${req.path}`); */

  rateLimiter.consume(clientIp)
    .then((r) => {/* console.log(`PASS ${clientIp} | Remaining: ${r}`) */ next();})
    .catch((rejRes) => {
      /* console.log(`PASS ${clientIp} | Remaining: ${rejRes}`) */
      res.status(429).json({ 
        error: `Too many requests. Try again later. `,
        retryAfter: Math.floor(rejRes.msBeforeNext / 1000) // сек до разблокировки
      });
    });
});

/*
--------------------R_O_U_T_S--------------------
*/ 

// Base route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Captcha server ready 🚀', 
    yourIP: req.ip,
    userAgent: req.get('User-Agent')
  });
});

app.post('/captcha', solveCaptcha);

/*
--------------------R_O_U_T_S-E_N_D--------------------
*/ 

// Port
const PORT = process.env.PORT || 30123;

// Ctrl+C shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM shutdown (Ctrl+C)');
  process.exit(0);
});

/**
 * Для справки :D
 * SIGTERM — это «вежливый» запрос на завершение:
 * Процесс получает время на:
 *    сохранение данных;
 *    закрытие файлов и сетевых соединений;
 *    освобождение ресурсов;
 *    выполнение прочих действий по очистке.
**/

// Starting
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
