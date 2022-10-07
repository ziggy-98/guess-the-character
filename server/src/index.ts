import express from "express";
import nunjucks from "nunjucks";
import path from "path";
import NodeCache from "node-cache";
import routes from "./routes";
import testUserData from "../__tests__/testUserData.json";

export const app = express();
export const cache = new NodeCache({ stdTTL: 86400 });
const port = 3000;

nunjucks.configure(path.resolve(__dirname, "views"), {
  express: app,
  autoescape: true,
  noCache: false,
  watch: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

app.get("/", (req, res) => {
  res.render("index.html", {});
});

export default app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
