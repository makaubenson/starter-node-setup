const nodemailer = require("nodemailer");
const pug = require("pug");
const coverter = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    if (user !== " ") {
      this.to = user.email;
      this.url = url;
      this.from = `Node.js Starter`;
      this.firstname = user.name.split(" ")[0];
    }
  }

  async send(template, subject) {
    let html = pug.renderFile(`${__dirname}/../views/emails/verified.pug`, {
      url: this.url,
    });

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject,
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
