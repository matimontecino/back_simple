import { connect } from "../databases";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET_KEY;

export const logIn = async (req, res) => {
  try {
    const { user: sub, username } = req.body;
    const payload = { sub: sub, username: username };
    const token = generateToken(payload);
    res.header("auth", token).json({ message: "todo ok", token: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listarProductos = (req, res) => {
  const uderId = req.user.sub;
  console.log(uderId);
  const productos = [
    { nombre: "coca", precio: "2500", desc: "retornable" },
    { nombre: "asd", precio: "asd", desc: "asd" },
    { nombre: "asd", precio: "asd", desc: "ads" },
  ];
  res.json(productos);
};

//crear usuarios desde el sigup
export const createUsers = async (req, res) => {
  try {
    const { nombre, dni } = req.body;
    const cnn = await connect();

    const [insert] = await cnn.query(
      "INSERT INTO alumno (nombre, dni) values (?,?)",
      [nombre, dni]
    );

    console.log(insert);

    if (insert.affectedRows === 1) {
      return res.status(200).json({ message: "todo ok" });
    } else {
      return res.status(500).json({ message: "no ok" });
    }
  } catch (error) {}
};

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, secret, { expiresIn: "5m" });
  } catch (error) {
    return error;
  }
};

export const auth = (req, res, next) => {
  const token = req.headers["auth"];
  if (!token) return res.send("no hay token");

  jwt.verify(token, secret, (error, user) => {
    if (error) {
      res.send("token invalido");
    } else {
      console.log(user);
      req.user = user;
      next();
    }
  });
};
