﻿var nodemailer: Nodemailer = require('nodemailer'); // https://github.com/andris9/nodemailer
import Logger = require('./Logger');

class Mailer {
    constructor(private fromEmail: string, private smtpOptions: NodemailerSMTPTransportOptions, private logger: Logger ) {
    }

    public sendEmail(toEmailAddress: string, subject: string, body: string) {
        var smtpTransport: Transport = nodemailer.createTransport("SMTP", this.smtpOptions);

        var message: MailComposer = {
            from: this.fromEmail,
            to: toEmailAddress,
            subject: subject,
            html: body
        };

        smtpTransport.sendMail(message, (error) => {
            if (error) {
                this.logger.log(error.message);
            }
            else {
                this.logger.log("Sent email to " + toEmailAddress + ": " + subject);
            }
            smtpTransport.close();
        });
    }
}

export = Mailer;