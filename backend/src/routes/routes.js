import express from "express";
import * as clubeController from "../controller/clubeController.js";
import { fileMiddleware } from "../service/multerService.js";

const route = express.Router();

route.get('/', clubeController.findAllClubs);
route.get('/:id', clubeController.findByIdClub);
route.post('/',fileMiddleware, clubeController.createClub);
route.delete('/:id', clubeController.deleteClub);
route.put('/:id',fileMiddleware, clubeController.updateClub);


export default route;
