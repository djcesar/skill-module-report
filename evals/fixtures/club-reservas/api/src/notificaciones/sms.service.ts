import { Injectable } from '@nestjs/common';

const SMS_API_URL = 'https://api.sms-proveedor.example/v1/messages';
const SMS_API_KEY = 'smsprov-live-EXAMPLE-0000-not-a-real-key';

@Injectable()
export class SmsService {
  async enviar(celular: string, texto: string) {
    await fetch(SMS_API_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${SMS_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: `+57${celular}`, text: texto }),
    });
  }
}
