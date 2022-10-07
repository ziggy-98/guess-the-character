export * from "./api";
import express from "express";
import { apiRoutes } from "./api";

const routes = express.Router();
routes.use(apiRoutes);
export default routes;
