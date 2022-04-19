import config from "../config";
import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";

export const sendMailGun = (to, subject, text) => {
  const mailgunInstance = mailgun({
    apiKey: config.MAILGUN_API_KEY,
    domain: config.MAILGUN_DOMAIN,
  });
  const token = jwt.sign({ email }, config.APP_SECRET, { expiresIn: 3600 });
  const data = {
    from: config.MAILGUN_FROM,
    to,
    subject,
    html: `
    Click <a href='${config.FRONT_URL}/reset-password/${token}/${email}'>
      here
    </a> to go to the reset password page.`,
  };
  console.log(data);

  mailgunInstance.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      res.json({ result: false });
    }
    console.log(body);
    res.json({ result: true });
  });
};
