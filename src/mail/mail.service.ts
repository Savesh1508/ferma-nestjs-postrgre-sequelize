import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from '@nestjs/common';
import { Worker } from 'src/worker/model/worker.model';
import { Admin } from "../admin/model/admin.model";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService){}

  async sendWorkerConfirmation(worker:Worker):Promise<void> {
    const url = `${process.env.API_HOST}/api/workers/activate/${worker.activation_link}`;
    await this.mailerService.sendMail({
      to: worker.email,
      subject: 'Welcome to Ferma App! Confirm your Email!',
      template: './confirmation-worker',
      context: {
        name: worker.name,
        url,
      },
    });
  }

  async sendAdminConfirmation(admin:Admin):Promise<void> {
    const url = `${process.env.API_HOST}/api/admins/activate/${admin.activation_link}`;
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Ferma App! Confirm your Email!',
      template: './confirmation',
      context: {
        name: admin.name,
        url,
      },
    });
  }
}
