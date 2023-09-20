import mysql from "mysql2";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    "INSERT INTO users (email, password, username) VALUES (?,?,?)",
    [email, hashPass, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query("Select * from users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("check result: ", results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
