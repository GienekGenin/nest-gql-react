import * as nodemailer from 'nodemailer';
import { configService } from '../config/config.service';

export const sendEmail = async (email: string, link: string) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.getValue('EMAIL'),
        pass: configService.getValue('EMAIL_PASS'),
      },
    });

    const mailOptions = {
      from: configService.getValue('EMAIL'), // sender address
      to: email, // list of receivers
      text: 'Hello world?', // plain text body
      html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.error(e);
  }
};
