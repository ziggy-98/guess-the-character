export * from "./api";
import express from "express";
import apiRoutes from "./api";
import viewRoutes from "./views";

const routes = express.Router();
routes.use(apiRoutes);
routes.use(viewRoutes);
export default routes;
