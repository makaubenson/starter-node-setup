const nodemailer = require("nodemailer");
const pug = require("pug");
const coverter = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    if (user !== " ") {
      this.to = user.email;
      this.url = url;
      this.from = `starter@example.com`;
      this.firstname = user.name.split(" ")[0];
    }
  }

  async send(url) {
    let html = pug.renderFile(`${__dirname}/../views/emails/verified.pug`, {
      url,
    });

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Express.js Starter",
      html,
      text: coverter.convert(html),
    };
    try {
      await this.createTransport().sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
  createTransport() {
    if (process.env.NODE_ENV == "development") {
      return nodemailer.createTransport({
        //TODO DEVELOPMENT EMAILS
        host: process.env.DEV_MAIL_HOST,
        port: process.env.DEV_MAIL_PORT,
        auth: {
          user: process.env.DEV_MAIL_USER,
          pass: process.env.DEV_MAIL_PASS,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAILHOST,
      port: process.env.EMAILPORT,
      secure: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  //
};
