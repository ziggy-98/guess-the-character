import {
  getCurrentScore,
  resetGame,
  startGame,
  submitAnswer,
} from "./handlers/api";
import { Router } from "express";

export const apiRoutes = Router();

apiRoutes.post("/api/start-game", startGame);
apiRoutes.patch("/api/submit-answer", submitAnswer);
apiRoutes.get("/api/score", getCurrentScore);
apiRoutes.post("/api/reset", resetGame);

export default apiRoutes;
