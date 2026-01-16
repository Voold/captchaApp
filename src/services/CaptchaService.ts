import type { UserData, LogEntry } from "../types";

// TODO: TG sender + repo | service.logAttempt(userData)
class CaptchaService {
  // main Method
  async processAttempt(userData: UserData, challenge: string): Promise<{success: boolean, reason: string}> {
    const logEntry: LogEntry = {
      ...userData,
      challenge,
      data: { attemptId: Date.now() } // UID over date
    };

    
    console.log('CAPTHA LOG: ', JSON.stringify(logEntry, null, 2));

    return {
      success: false,
      reason: 'suspicious_activity'
    }
  }
}
  
  export const captchaService = new CaptchaService();