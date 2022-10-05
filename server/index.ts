import express from "express";

const app = express();
const port = 3000;

export default app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
