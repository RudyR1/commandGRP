const models = require("../models");
const jwt = require("jsonwebtoken");

const secret_token = process.env.TOKEN_SECRET;

const browse = (req, res) => {
  models.users
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmail = (req, res, next) => {
  const { email } = req.body;

  models.users
    .selectByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const read = (req, res) => {
  models.users
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const user = req.body;

  user.id = parseInt(req.params.id, 10);

  models.users
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editUserPassword = (req, res) => {
  const user = req.body;
  console.log(user);

  jwt.verify(req.cookies.token, secret_token, (err) => {
    if (err) {
      console.info("problème");
    } else
      models.users
        .updateUserPassword(user)
        .then(([result]) => {
          if (result.affectedRows === 0) {
            res.sendStatus(404);
          } else {
            res.sendStatus(204);
          }
        })
        .catch((error) => {
          console.error(error);
          res.sendStatus(500);
        });
  });
};

const add = (req, res) => {
  const user = req.body;

  models.users
    .insert(user)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        res.status(201).send("This user has been created");
      } else {
        res.status(500).send("The user cannot be created");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};


const destroy = (req, res) => {
  models.users
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteSession = (req, res) => {
  // créer un blacklist pour stocker le token
  res
    .cookie("token", "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;", {
      httpOnly: true,
    })
    .status(200)
    .send({ Message: "User disconnected" });
};

module.exports = {
  browse,
  read,
  getUserByEmail,
  edit,
  add,
  destroy,
  deleteSession,
  editUserPassword,
};
