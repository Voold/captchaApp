import axios from 'axios';

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.warn(' TG Bot\'s data didn\'t find. ')
}

export async function sendToTelegram(message: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(' BOT TOKEN or CHAT ID is incorrect! ');
    console.warn(` message ${message} didn\'t deliver `)
    return false
  }
  // FIXME: ADD TG LOGIC
  return true
}