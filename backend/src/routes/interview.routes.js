import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  postQuestion,
  postEvaluation,
} from "../controllers/interview.controller.js";

const router = Router();

router.post("/pergunta", asyncHandler(postQuestion));
router.post("/avaliar", asyncHandler(postEvaluation));

export default router;
