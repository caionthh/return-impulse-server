import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ba86276f10a1a6",
    pass: "392d92d73c3c50",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Eadoo <oi@eadoo.tec.br>",
      to: "Caio Oliveira <caioeadoo@gmail.com>",
      subject,
      html: body,
    });
  }
}
