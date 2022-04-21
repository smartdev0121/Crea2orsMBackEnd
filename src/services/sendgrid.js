import path from "path";
import ejs from "ejs";
import sgMail from "@sendgrid/mail";
import config from "../config";

sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendMail = async (to, subject, template, data) => {
  console.log("start");
  const html = await ejs.renderFile(
    path.resolve(__dirname, `../../templates/${template}.ejs`),
    data
  );
  console.log("html rendered");

  return sgMail.send({
    from: {
      email: config.MAIL_FROM,
      name: config.MAIL_FROMNAME,
    },
    to,
    subject,
    html,
  });
};
