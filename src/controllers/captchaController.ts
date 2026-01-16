import type { Request, Response } from 'express';
import type { UserData } from '../types';
import { captchaService } from '../services/CaptchaService';

//collect user data
function collectUserData (req: Request): UserData {
  return {
    ip: req.ip || 'unknown',
    userAgent: req.get('User-Agent') || 'unknown',
    timestamp: new Date().toISOString(),
    actionType: 'captcha',
  };
} 

// HTTP handler /captcha POST
export const solveCaptcha = async ( req: Request, res: Response ) => {
  if (!req.body || typeof req.body.challenge !== 'string') {
    return res.status(400).json({error: 'Bad challenge'});
  }

  const result = await captchaService.processAttempt(collectUserData(req), req.body.challenge);

  // Jocker's trap :D
  res.status(400).json({
    success: false,
    error: 'Подозрительная активность. Попробуйте еще раз.',
    retry: true // new Captcha
  });
}


  