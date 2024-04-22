import express from "express";
import { usersData, newUser, login } from "../controllers/Users.js";
const routes = express.Router();

routes.get("/usersData", usersData);
routes.post("/register", newUser);
routes.post("/login", login);

export default routes;
