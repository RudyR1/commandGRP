const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, email, phone_number, postal_code,password_hash,salt,profile_picture,adress,city,is_producer) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.phone_number,
        user.postal_code,
        user.hpassword,
        user.salt,
        user.profile_picture,
        user.adress,
        user.city,
        user.is_producer,
      ]
    );
  }

  selectByEmail(email){
    return this.database.query(
        `SELECT id,firstname,email,password_hash,salt from ${this.table}  WHERE email = ? `,
        [email]
      );
  }


  updateUserPassword(user) {
    return this.database.query(
      `update ${this.table} set password_hash = ?, salt = ? where id = ?`,
        [user.hpassword, user.salt, user.id]
      );
  }
}

module.exports = UsersManager;
