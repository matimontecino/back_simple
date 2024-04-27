import { connect } from "../databases";

export const logIn = async (req, res) => {
  res.send("login user");
};

//crear usuarios desde el sigup
export const createUsers = async (req, res) => {
  res.send("create user");
};
