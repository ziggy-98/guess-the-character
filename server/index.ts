import express from "express";
import NodeCache from "node-cache";
import path from "path";
import routes from "./src/routes";

export const app = express();
export const cache = new NodeCache({ stdTTL: 86400 });
const port = 3000;

app.use(express.static(path.resolve(__dirname, "client")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

export default app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
