import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail({
    email,
    subject,
    template,
    name,
    activation_token,
  }: {
    email: string;
    subject: string;
    template: string;
    name: string;
    activation_token: string;
  }) {
    await this.transporter.sendMail({
      from: this.configService.get<string>('SMTP_FROM'),
      to: email,
      subject,
      html: `
        <h1>Hello ${name}</h1>
        <p>Please click the link below to activate your account:</p>
        <a href="${activation_token}">Activate Account</a>
      `,
    });
  }
} 