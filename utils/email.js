const nodemailer = require("nodemailer");
const pug = require("pug");
const coverter = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    if (user !== " ") {
      this.to = user.email;
      this.url = url;
      this.from = `Unihome @ ${process.env.EMAILFROM}`;
      this.firstname = user.name.split(" ")[0];
    }
  }

  async send(template, subject) {
    let html = pug.renderFile(`${__dirname}/../views/emails/resetPass.pug`, {
      url: this.url,
    });

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: coverter.convert(html),
      // text: `reset password using ${this.url}`,
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

  async sendWelcome() {
    this.send("welcome", "Welcome to techkey family");
  }
  async sendResetPassword() {
    this.send("resetpassword", "Password Reset link");
  }
  async sendContactForm(name, email, subject, message) {
    let mailOptions = {
      from: email,
      to: "info@techkey.co.ke",
      subject: `${subject} from ${name} `,
      // html,
      text: message,
    };
    await this.createTransport().sendMail(mailOptions);
  }
  async sendEmailVerification(code) {
    let html = pug.renderFile(`${__dirname}/../views/emails/signup.pug`, {
      code,
    });

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Welcome to Unihome. Please verify your Identity ",
      // html,
      html,
      text: coverter.convert(html),
      // text: `Your Verification Code is : ${code}`,
    };
    await this.createTransport().sendMail(mailOptions);
  }
  async sendVerifiedEmail() {
    let html = pug.renderFile(`${__dirname}/../views/emails/verified.pug`);

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Unihome Acount Verified",
      // html,
      html,
      text: coverter.convert(html),
      // text: `Your Verification Code is : ${code}`,
    };
    await this.createTransport().sendMail(mailOptions);
  }
  async sendOrderConfirmEmail(
    houseName,
    houseID,
    date,
    username,
    useremail,
    pricing,
    bookingID
  ) {
    let html = pug.renderFile(`${__dirname}/../views/emails/order.pug`, {
      houseName,
      houseID,
      date,
      username,
      useremail,
      pricing,
      bookingID,
    });

    let mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Order confirmation",
      // html,
      html,
      text: coverter.convert(html),
      // text: `Your Verification Code is : ${code}`,
    };
    await this.createTransport().sendMail(mailOptions);
  }
  //
};
