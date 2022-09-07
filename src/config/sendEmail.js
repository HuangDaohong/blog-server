// 发送注册验证码的邮件
const nodemailer = require('nodemailer');
const { sendCodeError } = require('../constant/err.type');

const config = {
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '3192638245@qq.com',
    pass: 'pusqvaeokyqjddjb',
  },
};

// 开启一个 SMTP 连接池
const transporter = nodemailer.createTransport(config);

function sendMail(to, subject, text, html) {
  const mailOptions = {
    from: '"Huang Blog "<3192638245@qq.com>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
module.exports = { sendMail };
