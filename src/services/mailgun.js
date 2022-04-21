import config from "../config";
const mailgun = require("mailgun-js");
import ejs from "ejs";
import path from "path";

export const sendMailGun = async (to, subject, template, data) => {
  const mg = mailgun({
    apiKey: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN,
  });

  var html = await ejs.renderFile(
    path.resolve(__dirname, `../../templates/${template}.ejs`),
    data
  );

  const mailOptions = {
    from: config.MAILGUN_FROM,
    to,
    subject,
    html,
  };

  mg.messages().send(mailOptions, function (error, body) {
    if (error !== undefined) {
      console.log("mailgun error", error);
      return false;
    } else {
      console.log("mailgun body:", body);
      return true;
    }
  });

  return false;
};
