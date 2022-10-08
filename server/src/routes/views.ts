import { Router } from "express";
import path from "path";

const viewRoutes = Router();

viewRoutes.get("/", (req, res) => {
  res.redirect("/game");
});

viewRoutes.get("/game", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "views", "index.html"), {});
});

viewRoutes.get("/game/:round", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "views", "index.html"), {});
});

export default viewRoutes;
