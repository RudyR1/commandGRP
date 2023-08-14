const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const uid = require("uid2");

const hashingoptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parellelism: 1,
};

const hashPassword = (req, res, next) => {
  const salt = uid(16);

  argon2
    .hash(req.body.password + salt, hashingoptions)
    .then((hashedPassword) => {
      req.body.hpassword = hashedPassword;
      req.body.salt = salt;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const verifyPassword = (req, res) => {
  const passwordToVerify = req.body.password + req.user.salt;

  argon2
    .verify(req.user.password_hash, passwordToVerify)
    .then((Verified) => {
      if (Verified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        delete req.body.password;
        delete req.user.password_hash;
        delete req.user.salt;

        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60),
          })
          .send({ token, user: { id: req.user.id } });
      } else {
        res
          .status(401)
          .send("Message : Les informations renseignées sont incorrectes");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
    //implémenter la vérification avec les tokens de la blacklist, si pas présent dedans on valide
  if (req.cookies) {
    jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send("Vous devez vous connecter poru accéder au site");
      } else {
        req.token = decode;
        next();
      }
    });
  }
};

module.exports = { hashPassword, verifyPassword, verifyToken };
