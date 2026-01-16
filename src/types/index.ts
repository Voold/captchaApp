// Все о юзере
export interface UserData {
  ip: string;
  userAgent: string;
  timestamp: string;
  actionType: 'captcha' | 'photo';
  challenge?: string,
  metadata?: {
    screen?: string;
    language?: string;
  };
  //data?: Record<string, any>; // Этот any можно было бы защитить через zod
}

// Для БД/логов (JSON stringify)
export type LogEntry = UserData & { data: Record<string, any> };