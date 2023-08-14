const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_MAIL;
const payload = { sub: "test" };
const token = jwt.sign(payload, secret, { expiresIn: "1h" });

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const accessToken = oAuth2Client.getAccessToken();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "Oauth2",
    user: process.env.AUTH_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

const sendMailResetById = (req) => {
    transport?.sendMail(
        {
            from: "COMMD-GRP <devtestrura@gmail.com>",
            to: `${req.user.email}`,
            subject: "Réinitialisation de votre mot de passe",
            text: "Pour réinitialiser votre mot de passe",
            html: `<a href="http://localhost:5173/forgetpassword?token=${token}&id=${req.user.id}">Cliquez ici</a>`,
        },
        (err, info) => {
            if (err) console.error(err);
            else{
                transport?.close();

            } console.warn(info);   
        }
        //Voir pourquoi dans Postman, après l'envoi du lien de réinit, ça mouline...
    )
}

module.exports = { sendMailResetById };