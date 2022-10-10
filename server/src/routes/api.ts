import {
  getCurrentScore,
  resetGame,
  startGame,
  submitAnswer,
  getCurrentRound,
} from "./handlers/api";
import { Router } from "express";

const apiRoutes = Router();

apiRoutes.post("/api/start-game", startGame);
apiRoutes.patch("/api/submit-answer", submitAnswer);
apiRoutes.get("/api/score", getCurrentScore);
apiRoutes.post("/api/reset", resetGame);
apiRoutes.get("/api/round", getCurrentRound);

export default apiRoutes;
