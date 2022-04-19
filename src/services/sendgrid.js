import path from "path";
import ejs from "ejs";
const sgMail = require("@sendgrid/mail");
import config from "../config";

sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendMail = async (to, subject, template, data) => {
  console.log("maile send start");
  const html = await ejs.renderFile(
    path.resolve(__dirname, `../../templates/${template}.ejs`),
    data
  );
  console.log("render ended", config.SENDGRID_API_KEY, config.MAIL_FROM);

  await sgMail.send({
    from: "techdev@artist2fans.live",
    to: "gentlesmile918@gmail.com",
    subject: "HHH",
    html: html,
  });

  return true;
};
