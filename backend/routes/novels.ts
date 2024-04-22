import express from 'express'
import * as NovelsController from "../controllers/novels"

const router = express.Router()

router.get("/", NovelsController.getNovels) 

router.get("/:novelId", NovelsController.getNovel)

router.post("/", NovelsController.createNovel)

router.patch("/:novelId", NovelsController.updateNovel)

router.delete("/:novelId", NovelsController.deleteNovel)

export default router