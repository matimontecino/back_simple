//archivo para manejar las rutas de usuarios

import { Router } from "express";
import {
  createUsers,
  logIn,
  publico,
  privado,
  getToken,
  auth,
  listarProductos,
} from "../controller/users";

//objeto para manejo de url
const routerUsers = Router();

//Enpoint para loguear usuario
/**
 * @swagger
 * /user/login:
 *  post:
 *      sumary: loguear usuario
 */
routerUsers.post("/user/login", logIn);

/**
 * @swagger
 * /usersp:
 *  post:
 *      sumary: crea usuarios
 */
routerUsers.post("/user/usersp", createUsers);

routerUsers.get("/products/getAll", auth, listarProductos);

export default routerUsers;
