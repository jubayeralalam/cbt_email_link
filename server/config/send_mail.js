const transporter = require("./smtp.config");
require("dotenv").config();
const sender = process.env.SMTP_SENDER;
const cypherKey = process.env.CYPHER_KEY;
const hbs = require("nodemailer-express-handlebars");
const path=require('path');
const ejs=require('ejs');
const AES = require('crypto-js/aes');

const sendEmail =async (user) => {
  const {_id,expireAt,userName,email}=user;
  const expireTime = Math.round(
    (new Date(expireAt).getTime() - new Date().getTime()) / 60000
  );

  var timeConvert = function(expireTime){
    var minutes = expireTime%60
    var hours = (expireTime - minutes) / 60
    return hours + ":" + minutes;
   }
  const convertedExpireTime= timeConvert(expireTime);


  const encryptId = (str) => {
    const cipherText = AES.encrypt(str, cypherKey);
    return encodeURIComponent(cipherText.toString());
  }

  const templatePath=path.join(__dirname, "../../New folder (3)/views/email.ejs");
  const data=await ejs.renderFile(templatePath,{
    userName: userName,
    expireTime: convertedExpireTime,
    userId:encryptId(_id.toString())
  });

  // const handlebarOptions = {
  //   viewEngine: {
  //     extName: ".handlebars",
  //     partialsDir: "./views",
  //     defaultLayout: false,
  //   },
  //   viewPath: "./views",
  //   extName: ".handlebars",
  // };
  // transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: sender,
    to: email,
    subject: "New email",
    // template: "welcome",
    html: data,
    context: {
      userName: userName,
      expireTime: convertedExpireTime,
      userId:encryptId(_id.toString()),
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
